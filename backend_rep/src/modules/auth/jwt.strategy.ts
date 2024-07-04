import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prismaservice: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: { id: string }) {
    try {
      const user = await this.prismaservice.user.findUnique({
        where: {
          id: payload.id,
        },
        include: {
          roles: {
            include: {
              permissions: true,
            },
          },
        },
      });
      if (!user) throw new UnauthorizedException();
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
