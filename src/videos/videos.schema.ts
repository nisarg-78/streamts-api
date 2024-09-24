import { Schema } from 'mongoose';

export const VideoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  id: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});
