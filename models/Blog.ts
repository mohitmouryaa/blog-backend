import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

interface Blog extends Document {
  title: string;
  content: string;
  authorId: ObjectId;
  status: "pending" | "approved" | "rejected";
}

const BlogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = model<Blog>("Blog", BlogSchema);

//Fields: `_id`, `title`, `content`, `authorId`, `status` ("pending", "approved", "rejected"), `createdAt`, `updatedAt`.
