import { BadRequestException, GoneException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from 'src/config/dotenv';

export const generateKey = (id: string, name: string, userKey?: string): string => {

  let permission: number = 0;

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

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {

    switch (err.message) {
      case 'jwt must be provided':
        throw new BadRequestException('토큰이 전송되지 않았습니다');
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        throw new UnauthorizedException('위조된 토큰입니다');
      case 'jwt expired':
        throw new GoneException('토큰이 만료되었습니다');
      default:
        // tslint:disable-next-line: no-console
        console.log(err);
        throw new InternalServerErrorException('다시 시도해 주세요');
    }
  }
}
