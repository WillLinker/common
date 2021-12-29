import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database!";

  constructor() {
    super("DatabaseConnectionError");
    // Only because we are extending a build in class.
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    let message:string = this.reason;
    return [{ message }];
  }
}