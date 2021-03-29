import {
  CanActivate, 
  ExecutionContext, 
  GoneException, 
  Injectable, 
  InternalServerErrorException, 
  UnauthorizedException 
} from '@nestjs/common';
import * as jwt from 'src/lib/token.lib';

@Injectable()
export default class AuthGaurd implements CanActivate {

  public canActivate (context: ExecutionContext): boolean {
    
    const request = context.switchToHttp().getRequest();

    const { access_token } = request.headers;

    if (access_token === undefined) {
      throw new UnauthorizedException('토큰이 전송되지 않았습니다');
    }

    request.user = this.validateToken(access_token);

    return true;
  }

  private validateToken (token: string): string {
    try {

      const verify: string = jwt.verifyKey(token) as string;

      return verify;
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
