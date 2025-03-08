import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


interface AuthenticatedRequest extends Request {
  user?: any;
}

export default async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {

  
  const token = req.headers.authorization;


  if (!token) {
    return res.status(401).json({ message: 'Server error , Please login again.' });
  }


  const accessToken = token.split(' ')[1];


  jwt.verify(accessToken, process.env.JWT_SECRET!, async(err: any, decoded: any) => {
   
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    

    next();
  
  });
}
