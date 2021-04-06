import {
  CanActivate,
  ExecutionContext,
  GoneException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { IToken } from 'src/lib/interface/IToken';
import * as jwt from 'src/lib/token.lib';

@Injectable()
export default class AuthGaurd implements CanActivate {

  private permission: number = 0;

  constructor (permission?: number) {
    this.permission = permission;
  }

  public async canActivate (context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const { access_token } = request.headers;

    if (access_token === undefined) {
      throw new UnauthorizedException('토큰이 전송되지 않았습니다');
    }

    const validatedToken: IToken = await this.validateToken(access_token);

    if (this.permission >= validatedToken.permission) {
      throw new UnauthorizedException('권한 없음');
    }

    request.user = validatedToken;

    return true;
  }

  private async validateToken (token: string): Promise<IToken> {
    try {

      return await jwt.verifyKey(token) as IToken;
    } catch (error) {
      switch (error.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new UnauthorizedException('유효하지 않은 토큰입니다');

        case 'EXPIRED_TOKEN':
          throw new GoneException('토큰이 만료되었습니다.');

        default:
          throw new InternalServerErrorException('서버 오류');
      }
    }
  }
}
