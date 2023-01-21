import { UserModel } from '../../models/users.model'
import exec from 'child_process'

const userStore = new UserModel()

describe('User Model', () => {

  afterAll((done) => {
    exec.exec(`db-migrate --env test reset`, (err, stdout, stderr) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(stdout)
        done()
      })
  })

  it('Should create a user', async () => {
    const result = await userStore.createUser({
      username: 'test_doe',
      firstName: 'John',
      lastName: 'Doe',
      password_digest: 'Test123',
    })

    expect(result.username).toBe('test_doe')
  })

  it('Should retrieve user by Id', async () => {
    const users = await userStore.getAllUsers()

    const userId = users[0].id as number

    const result = await userStore.getUserById(userId)

    expect(result.username).toBe('testUser')
  })

  it('Should retrieve list of users', async () => {
    const result = await userStore.getAllUsers()
    expect(result[0].username).toBe('testUser')
  })

  it('Should update a user', async () => {
    const users = await userStore.getAllUsers()

    const userId = users[0].id as number

    const result = await userStore.updateUser({
      id: userId,
      username: 'test_does',
      firstName: 'John',
      lastName: 'Doe',
      password_digest: 'Test321',
    })

    expect(result.username).toBe('test_does')
  })

  it('Should delete a user', async () => {
    let users = await userStore.getAllUsers()

    const userId = users[0].id as number

    await userStore.deleteUser(userId)

    users = await userStore.getAllUsers()

    expect(users.length).toBe(2)
  })
})
