const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createUser = async (request, name, username, password) => {
  await request.post('http://localhost:3003/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }
  })
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'add blog'}).click()
  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('url').fill(url)
  await page.getByRole('button', { name: 'create'}).click()
}

export { loginWith, createUser, createBlog }