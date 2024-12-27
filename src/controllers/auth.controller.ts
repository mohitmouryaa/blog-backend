import { NextFunction, Request, RequestHandler, Response } from "express";
import { logInSchema, signUpSchema } from "../schemas/authSchema"; // Assuming you have a schema for validation
import { comparePassword, createUser, getUser, getUserWithPassword, hashUserPassword } from "../models/User"; // Assuming you have a User model
import { asyncHandler } from "../utility/asyncHandler";

export const signUp: RequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = await signUpSchema.parseAsync(req.body);
  const { username, email, password, role } = result;

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
    role,
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
  const { username, email, password, provider } = await logInSchema.parseAsync(req.body);
  console.log("called");

  const user = await getUser(email); // user object without password field
  const UserWithPassword = await getUserWithPassword(email); // user object with password field

  console.log("the password is ", password, UserWithPassword?.password, user);
  let isPasswordValid;
  if (UserWithPassword) {
     isPasswordValid = await comparePassword(password, UserWithPassword?.password);
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
      const hashedPassword = await hashUserPassword(password);
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

      res.status(201).json({ message: "User created successfully", success: true });
      return;
    }
  }
  res.status(200).json({ message: "Login successfully", success: true, user });
  return;
});
