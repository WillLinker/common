import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string,
  email: string
};
/*
 *  Telling typescript to extend the interface for Express/Request to add
 *  our new property as type UserPayload
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}
export const currentUser = (req: Request, res: Response, next: NextFunction) => {

  if (!req.session?.jwt) {     // same as line above!!!
    return next();
 }

 try {
    //                   "!" is to tell TypeScript I know the variable exist!
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
 } catch(err) {
    console.log("JWT.verify encountered error", err);
 }

 next();
};