import { Document, model, Schema } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: "reader" | "author" | "admin"; 
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      unique: true,
      required: true, 
    },
    email: {
      type: String,
      unique: true,
      required: true, 
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, 
      enum: ["reader", "author", "admin"], 
      required: true, 
      default: "reader",
    },
  },
  { timestamps: true }
);

export const User = model<User>("User", UserSchema);
