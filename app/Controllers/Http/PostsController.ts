import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostStoreValidator from 'App/Validators/PostStoreValidator'
import PostUpdateValidator from 'App/Validators/PostUpdateValidator'

export default class PostsController {
  public async index () {
    // const posts = await Post.all()
    const posts = await Post.query().orderBy('id').preload('author')

    return posts
  }

  public async store ({ request, auth }: HttpContextContract) {
    const data = await request.validate(PostStoreValidator)
    const user = await auth.authenticate()

    const post = await Post.create({ authorId: user.id, ...data })
    await post.preload('author')

    return post
  }

  public async show ({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.preload('author')

    return post
  }

  public async update ({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    // const data = request.only(['title', 'content'])
    const data = await request.validate(PostUpdateValidator)

    post.merge(data)
    await post.save()
    await post.preload('author')

    return post
  }

  public async destroy ({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}
