import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document  {
  @Prop({ required: true })
  name: string;
    
  @Prop({ required: true , unique: true })
  email: string;
    
  @Prop({ required: true })
  password: string;
    
  @Prop({ type: [Number], default: []})
  favoriteTeams: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
