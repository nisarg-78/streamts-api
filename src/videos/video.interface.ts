import { Document } from 'mongoose';

export interface Video extends Document {
  _id: string;
  title: string;
  date: Date;
  tags: string[];
  id: string;
  thumbnail: string;
}
