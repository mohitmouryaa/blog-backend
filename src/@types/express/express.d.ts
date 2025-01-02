import { jwtTokenData } from "../../schemas/jwtSchema";

 declare global {
  namespace Express {
    interface Request {
      user?: jwtTokenData;
    }
  }
}