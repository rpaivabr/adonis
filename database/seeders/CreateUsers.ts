import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class CreateUsersSeeder extends BaseSeeder {
  // public static developmentOnly = true
  public async run () {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@cataline.io',
        password: 'secret',
        role: 'admin'
      },
      {
        name: 'Normal',
        email: 'normal@cataline.io',
        password: 'secret',
        role: 'normal'
      }
    ])
  }
}
