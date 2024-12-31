import { Document, model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  role?: "reader" | "author" | "admin";
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
    },
  },
  { timestamps: true }
);

export const User = model<User>("User", UserSchema);

interface UserData {
  username: string;
  email: string;
  password: string;
  role?: "reader" | "author" | "admin";
}

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Query

export const getUser = async (email: string): Promise<null | any> => await User.findOne({ email }).select("-password").lean();
export const getUserWithPassword = async (email: string): Promise<null | any> => await User.findOne({ email });

export const getAllUsers = async (): Promise<null | any> => await User.find().select("-password");
export const createUser = async (data: UserData): Promise<null | any> => {
  const user = new User(data);
  return await user.save();
};

export const getUserById = (id: ObjectId): Promise<any | null> => User.findById(id).select("-password");
export const hashUserPassword = async (password: string): Promise<string> => await bcrypt.hash(password, 10);
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
