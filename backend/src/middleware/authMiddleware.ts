import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from './errorHandler.js';
import { RequestWithUser } from "../models/RequestWithUser.js";
import { JwtPayload } from "../models/JwtPayload.js";

const prisma = new PrismaClient();

export const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization as string;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Not authorized, no token', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'npFt4UDXvQKUmvAFYh3xzLPfIJ7tB8YG6lRH9jO1EsZqC2kW0dTVaMcS5XebgrynuIwoAPpE8Di7vN32K0hQRg=='
    ) as JwtPayload;

    // Get user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      throw new AppError('Not authorized, user not found', 401);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Not authorized, invalid token', 401));
    } else {
      next(error);
    }
  }
};
