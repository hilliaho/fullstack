const { test, describe } = require('node:test')
const assert = require('node:assert')
const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes

test('dummy returns one', () => {
  blogs = []
  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
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