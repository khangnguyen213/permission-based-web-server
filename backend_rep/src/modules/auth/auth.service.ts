import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
// import { hashSync, compareSync } from 'bcrypt';
import { hashSync, compareSync } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
    try {
      let user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashSync(data.password, 10),
        },
      });
      return { data: user };
    } catch (err) {
      return { err };
    }
  }

  async login(data: LoginDto) {
    try {
      let user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        throw {
          message: RESPONSE_MESSAGES.ERROR_EMAIL_OR_PASSWORD_INCORRECT,
        };
      }

      if (!compareSync(data.password, user.password)) {
        throw {
          message: RESPONSE_MESSAGES.ERROR_EMAIL_OR_PASSWORD_INCORRECT,
        };
      }

      return { data: await this.jwt.signAsync({ id: user.id }) };
    } catch (err) {
      return { err };
    }
  }
}
