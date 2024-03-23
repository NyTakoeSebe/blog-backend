import mongoose, { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostStatus } from '@/domains/entities';

export type postDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: ObjectId;

  @Prop({ unique: true, required: true })
  title: string;

  @Prop()
  desc: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    default: [],
  })
  tags: ObjectId[];

  @Prop()
  text: string;

  @Prop({ default: 'preview' })
  status: PostStatus;
}

export const postSchema = SchemaFactory.createForClass(Post);
