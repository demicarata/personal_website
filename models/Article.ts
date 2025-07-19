import mongoose, { Document, Schema } from "mongoose";

export interface IArticle extends Document {
  title: string;
  description: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
}, {
  timestamps: true 
});

export const Article = mongoose.model<IArticle>("Article", ArticleSchema);
