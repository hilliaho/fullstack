const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createUser, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await createUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen')
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })
})

describe('Login', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await createUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen')
    await page.goto('http://localhost:5173')
  })

  test('Succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')

    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'wrong')

    await expect(page.getByText('wrong credentials')).toBeVisible()
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await createUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen')
    await page.goto('http://localhost:5173')
    await loginWith(page, 'mluukkai', 'salainen')
  })

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, 'How to play right', 'Matti Luukkainen', 'www.fullstackopen.com')
    await expect(page.getByText('How to play right Matti Luukkainen')).toBeVisible()
  })

  test('blogs are arranged by the amout of likes', async ({ page }) => {
    await createBlog(page, 'First blog', 'Matti Luukkainen', 'www.fullstackopen.com')
    await createBlog(page, 'Second Blod', 'Matti Luukkainen', 'www.fullstackopen.com')
    await page.getByRole('button', { name: 'view' }).first().click()
    await page.getByRole('button', { name: 'view' }).last().click()
    await page.getByRole('button', { name: 'like' }).first().click()
    await page.getByRole('button', { name: 'like' }).last().click()
    await page.getByRole('button', { name: 'like' }).last().click()
    await page.getByRole('button', { name: 'hide' }).first().click()
    await expect(page.getByText('First blog Matti Luukkainen')).toBeVisible()
  })
})

describe('After creating a blog', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await createUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen')
    await page.goto('http://localhost:5173')
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'How to play right', 'Matti Luukkainen', 'www.fullstackopen.com')
  })

  test('a blog can be liked', async ({ page }) => {
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('1')).toBeVisible()
  })

  test('a blog can be deleted', async ({ page }) => {
    await page.getByRole('button', { name: 'view' }).click()
    page.on('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'remove' }).click()
    await expect(page.getByText('How to play right Matti Luukkainen')).toBeHidden();
  })

  test('other users than creator dont see the remove button', async ({ page, request }) => {
    await page.getByRole('button', { name: 'Logout' }).click()
    await createUser(request, 'Matti Luukkainen', 'privaluukkai', 'salainen')
    await loginWith(page, 'privaluukkai', 'salainen')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).toBeHidden();
  })
})



