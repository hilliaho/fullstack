const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithTwoBlogs = [
  {
    "title": "blog",
    "author": "blogger",
    "url": "www.blog.fi",
    "likes": 3
  },
  {
    "title": "blog2",
    "author": "blogger2",
    "url": "www.blog2.fi",
    "likes": 7
  },
]

const emptyBlogList = []

const listWithOneBlog = [
  {
    "title": "blog",
    "author": "blogger",
    "url": "www.blog.fi",
    "likes": 3
  }
]

const listWithTwoFavorites = [
  {
    "title": "blog",
    "author": "blogger",
    "url": "www.blog.fi",
    "likes": 8
  },
  {
    "title": "blog1",
    "author": "blogger1",
    "url": "www.blog1.fi",
    "likes": 3
  },
  {
    "title": "blog2",
    "author": "blogger2",
    "url": "www.blog2.fi",
    "likes": 8
  }
]

test('dummy returns one', () => {
  const result = dummy(emptyBlogList)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('right sum for empty list', () => {
    assert.strictEqual(totalLikes(emptyBlogList), 0)
  })

  test('right sum for list with one blog', () => {
    assert.strictEqual(totalLikes(listWithOneBlog), 3)
  })

  test('right sum for list with two blogs', () => {
    assert.strictEqual(totalLikes(listWithTwoBlogs), 10)
  })
})

describe('favorite blog', () => {
  test('right favorite for empty list', () => {
    assert.strictEqual(favoriteBlog(emptyBlogList), null)
  })

  test('right favorite for list with one blog', () => {
    const expected = {
      "title": "blog",
      "author": "blogger",
      "url": "www.blog.fi",
      "likes": 3
    }
    assert.deepStrictEqual(favoriteBlog(listWithOneBlog), expected)
  })

  test('works with two favorites', () => {
    const expectedOne = {
      "title": "blog",
      "author": "blogger",
      "url": "www.blog.fi",
      "likes": 8
    }
    const expectedTwo = {
      "title": "blog2",
      "author": "blogger2",
      "url": "www.blog2.fi",
      "likes": 8
    }
    result = favoriteBlog(listWithTwoFavorites)
    assert(
      JSON.stringify(result) === JSON.stringify(expectedOne) ||
      JSON.stringify(result) === JSON.stringify(expectedTwo))
  })
})

describe('most blogs', () => {
  test('returns null with empty list', () => {
    assert.strictEqual(mostBlogs(emptyBlogList), null)
  })

  test('returns right author with most blogs', () => {
    const expected = {
      "author": "Robert C. Martin",
      "blogs": 3
    }
    assert.deepStrictEqual(mostBlogs(blogs), expected)
  })

  test('works with two authors with most blogs', () => {
    const expectedOne = {
      "author": "blogger",
      "blogs": 1
    }
    const expectedTwo = {
      "author": "blogger2",
      "blogs": 1
    }
    result = mostBlogs(listWithTwoBlogs)
    assert(JSON.stringify(result) === JSON.stringify(expectedOne) ||
    JSON.stringify(result) === JSON.stringify(expectedTwo))
  })
})

describe('most likes', () => {
  test('returns null with empty list', () => {
    assert.strictEqual(mostLikes(emptyBlogList), null)
  })

  test('returns right author with most likes', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    assert.deepStrictEqual(mostLikes(blogs), expected)
  })

  test('works with two author with same amount of likes', () => {
    const expectedOne = {
      "author": "blogger",
      "likes": 8
    }
    const expectedTwo = {
      "author": "blogger2",
      "likes": 8
    }
    result = mostLikes(listWithTwoFavorites)
    assert(
      JSON.stringify(result) === JSON.stringify(expectedOne) ||
      JSON.stringify(result) === JSON.stringify(expectedTwo))
  })
})

