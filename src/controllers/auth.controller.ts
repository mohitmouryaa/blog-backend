import { NextFunction, Request, RequestHandler, Response } from "express";
import { logInWithPasswordSchema, logInWithRoleSchema, signUpSchema } from "../schemas/authSchema"; // Assuming you have a schema for validation
import {
  comparePassword,
  createUser,
  getUser,
  getUserWithPassword,
  hashUserPassword,
  updateUserRole,
  User,
} from "../models/User"; // Assuming you have a User model
import { asyncHandler } from "../utility/asyncHandler";
import { generateJwtToken } from "../utility/generateJwtToken";

export const signUp: RequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = await signUpSchema.parseAsync(req.body);
  const { username, email, password } = result;

  const userdata = await getUser(email);
  if (userdata) {
    res.status(400).json({ message: "User already exists", success: false });
    return;
  }

  const hashedPassword = await hashUserPassword(password);

  const createdUser = await createUser({
    username,
    email,
    password: hashedPassword,
  });
  if (!createdUser) {
    res.status(400).json({ message: "Error while creating user", success: false });

    return;
  }
  const user = await getUser(email);

  res.status(201).json({ message: "User created successfully.", success: true, user: user });
  return;
});

// Login route handler
export const login: RequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, provider, role } = req.body;

  const schema = provider ? logInWithRoleSchema : logInWithPasswordSchema;
  const validatedData = await schema.parseAsync(req.body);
  let username:string;
  if("username" in validatedData) {
    username = validatedData.username as string;
  }

  let user = await getUser(validatedData.email); // user object without password field
  const UserWithPassword = await getUserWithPassword(validatedData.email); // user object with password field

  let isPasswordValid: boolean;
  if (UserWithPassword) {
    isPasswordValid = await comparePassword(validatedData?.password, UserWithPassword?.password);
  }

  // if login with form
  if (!provider) {
    if (!user || !isPasswordValid) {
      res.status(400).json({ message: "Invalid Credentials", success: false });
      return;
    }
  } else {
    // Login with authO
    if (user && !isPasswordValid) {
      res.status(400).json({ message: "Password does not match", success: false });
      return;
    }

    if (!user) {
      const hashedPassword = await hashUserPassword(validatedData?.password);
      if (!username) {
        res.status(400).json({ message: "Username not provided", success: false });
        return;
      }

      const createdUser = await createUser({
        username,
        email,
        password: hashedPassword,
      });

      if (!createdUser) {
        res.status(400).json({ message: "Error creating user", success: false });
        return;
      }

      // res.status(201).json({ message: "User created successfully", success: true });
      user = createdUser;
    }
  }

  if (user && user.role === undefined) {
    await updateUserRole(email, role);
  }

  let data = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  let token = generateJwtToken(data);

  res.status(200).json({ message: "Login successfully", success: true, token });
  return;
});
