import { Request } from 'express';

export interface RequestSchema extends Request {
  userId: string;
}
