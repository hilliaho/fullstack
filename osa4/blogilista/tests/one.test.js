const { test, describe } = require('node:test')
const assert = require('node:assert')
const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog

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

