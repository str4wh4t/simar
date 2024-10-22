import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface AuthTokenPayload {
  userId: number;
}

export const getUserId = (req: Request): number | null => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthTokenPayload;
    return decoded.userId;
  } catch (e) {
    return null;
  }
};
