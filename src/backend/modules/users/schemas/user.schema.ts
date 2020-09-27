import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, minlength: 6 })
  login: string;

  @Prop({ maxlength: 100 })
  name: string;

  @Prop()
  age: number;

  @Prop({ maxlength: 100, unique: true })
  email: string;

  @Prop({ maxlength: 1 })
  sex: string;

  @Prop()
  description?: string;

  @Prop()
  birthday?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
