const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const {initialBlogs, blogsInDb} = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    
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
  await api.post('/api/blogs')
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
  await api.post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

test('http post returns code 400 if new blog doesnt have url field', async () => {
  const newBlog = {
    "title": "blog",
    "author": "blogger",
    "likes": 1
  }
  await api.post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

test('deleting a blog decreases the blog count by one', async () => {
  const blogsAtStart = await blogsInDb()
  const id = blogsAtStart[0]['id']
  await api.delete(`/api/blogs/${id}`)
  .expect(204)
  const blogsAfter = await blogsInDb()
  assert.strictEqual(blogsAfter.length, blogsAtStart.length-1)
})

after(async () => {
  await mongoose.connection.close()
})