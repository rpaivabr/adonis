import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column({ serializeAs: null })
  public authorId: number

  @belongsTo(() => User, { foreignKey: 'authorId' })
  public author: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  // public serialize(cherryPick?: CherryPick) {
  //   console.log(cherryPick?.fields)
  //   return {
  //     ...this.serializeAttributes(cherryPick?.fields, false),
  //     ...this.serializeComputed(cherryPick?.fields),
  //     ...this.serializeRelations({}, false),
  //   }
  // }
}
