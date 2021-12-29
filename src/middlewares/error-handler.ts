import  { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validator-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  
  if (err instanceof  CustomError)
  {
    return res.status(err.statusCode).send(err.serializeErrors());
  }
  else
  {
    console.log('[ErrorHandler] not a CustomError!!!!', err); 
  }
  res.status(400).send({errors: [{ message: err.message }] });
};