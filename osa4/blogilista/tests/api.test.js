const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const {initialBlogs, blogsInDb, initialUsers, usersInDb} = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const newUser = {
      username: 'Taina',
      name: 'Taina',
      password: 'taina',
    };
    await api.post('/api/users')
    .send(newUser);
    const loginResponse = await api
    .post('/api/login')
    .send({username: newUser.username, password: newUser.password})
    token = loginResponse.body.token
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    
  })

  test('new blog can not be added without a token', async () => {
    const newUser = {
      username: 'Taina2',
      name: 'Taina',
      password: 'taina',
    };
    await api.post('/api/users')
    .send(newUser);
    const users = usersInDb()
    const newBlog = {
      "title": "blog",
      "author": "blogger",
      "url": "www.blog.fi",
      "likes": 3,
      "user": users[users.length-1]
    }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(401)
  })

  test('right amount of blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('identifier field name is id', async () => {
      const allBlogs = await blogsInDb()
      const keys = Object.keys(allBlogs[0])
      assert(!keys.includes("_id") && keys.includes("id"))
  })

  test('adding a blog increases the amount of blogs by one', async () => {
      const newBlog = {
          "title": "blog",
          "author": "blogger",
          "url": "www.blog.fi",
          "likes": 3
        }
      const blogsAtStart = await blogsInDb()
      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      const blogsAfter = await blogsInDb()
      assert.strictEqual(blogsAtStart.length+1, blogsAfter.length)
  })

  test('likes field gets value 0 if it is left empty', async () => {
    const blogsAtStart = await blogsInDb()
    const newBlog = {
        "title": "blog",
        "author": "blogger",
        "url": "www.blog.fi"
    }
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const blogsAfter = await blogsInDb()
    assert.strictEqual(blogsAfter[blogsAtStart.length]['likes'], 0)
  })

  test('http post returns code 400 if new blog doesnt have title field', async () => {
    const newBlog = {
      "author": "blogger",
      "url": "www.blog.fi",
      "likes": 1
    }
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
  })

  test('http post returns code 400 if new blog doesnt have url field', async () => {
    const newBlog = {
      "title": "blog",
      "author": "blogger",
      "likes": 1
    }
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
  })

  test('deleting a blog decreases the blog count by one', async () => {
    const newBlog = {
      "title": "blog",
      "author": "blogger",
      "url": "www.blog.fi",
      "likes": 3
    }
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const blogsAtStart = await blogsInDb()
    console.log(blogsAtStart)
    const id = blogsAtStart[blogsAtStart.length-1]['id']
    await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
    const blogsAfter = await blogsInDb()
    assert.strictEqual(blogsAfter.length, blogsAtStart.length-1)
  })

  test('blog values change when blog is updated', async () => {
    const blogsAtStart = await blogsInDb()
    const blog = blogsAtStart[0]
    const newBlog = {
      "title": blog.title,
      "author": blog.author,
      "url": blog.url,
      "likes": blog.likes + 1,
      "id": blog.id
    }
    const id = blog['id']
    await api.put(`/api/blogs/${id}`)
    .send(newBlog)
    .expect(200)
    const blogsAfter = await blogsInDb()
    assert.strictEqual(blogsAfter[0].likes, blogsAtStart[0].likes + 1)
  })
})

describe.only('user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('two users with the same username can not be created', async () => {
    const newUser = {
      "username": "Taina",
      "name": "Taina Hilliaho",
      "password": "taina"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    await api.post('/api/users')
    .send(newUser)
    .expect(400)
  })

  test('username can not be shorter than 3 characters', async () => {
    const newUser = {
      "username": "TH",
      "name": "Taina Hilliaho",
      "password": "taina"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  })

  test.only('user can not be created without a username', async () => {
    const newUser = {
      "name": "Taina Hilliaho",
      "password": "taina"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  })

  test.only('password can not be shorter than 3 characters', async () => {
    const newUser = {
      "username": "Taina",
      "name": "Taina Hilliaho",
      "password": "th"
    }
    await api.post('/api/users')
    .send(newUser)
    .expect(400)
  })

  test.only('user can not be created without a password', async () => {
    const newUser = {
      "username": "Taina",
      "name": "Taina Hilliaho",
    }
    await api.post('/api/users')
    .send(newUser)
    .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})