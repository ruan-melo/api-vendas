import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 400);
  }

  const token = authHeader.split(' ')[1];
  try {
    const SECRET_KEY = process.env.SECRET_KEY ? process.env.SECRET_KEY : '';
    const decodedToken = verify(token, SECRET_KEY);

    const { sub } = decodedToken as TokenPayload;

    req.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError('JWT Token is invalid', 401);
  }
}

export default isAuthenticated;
