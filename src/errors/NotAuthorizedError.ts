import { CustomError } from "./CustomError";
/*
 * 
 */
export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("Not Authorized");
    // Only because we are extending a build in class.
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Authorized" }];
  }
}