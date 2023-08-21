import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET_KEY;
        await this.jwtService.verifyAsync(token, { secret });
        next();
      } else {
        throw new Error('Authorization header not found');
      }
    } catch (error) {
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
