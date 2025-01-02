import mongoose from "mongoose";

type Role = "reader" | "author" | "admin";

export interface jwtTokenData {
  id: mongoose.Schema.Types.ObjectId;
  role: Role;
  email: string;
}
