import mongoose, { Document, Schema } from "mongoose";

export interface IResource extends Document {
  title: string;
  link: string;
  type: 'article' | 'video' | 'book';
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['article', 'video', 'book'],
    default: 'article'
  }
}, {
  timestamps: true
});

export const Resource = mongoose.model<IResource>("Resource", ResourceSchema);
