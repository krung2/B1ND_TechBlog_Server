import * as jwt from 'jsonwebtoken';
import { SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from 'src/config/dotenv';

export const generateKey = (id: string, name: string, userKey?: string): string => {

  let permission: number;

  if ( userKey !== undefined) {

    permission = 1;
  }

  const payload = {
    id,
    name,
    permission,
  };

  const options: SignOptions = {
    expiresIn: '10d',
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export const decodedKey = (token: string) => {
  return jwt.decode(token);
}

export const verifyKey = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
}
