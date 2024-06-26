import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUserData } from 'src/common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    try {
      const { data, err } = await this.authService.register(body);
      if (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          throw {
            message: RESPONSE_MESSAGES.ERROR_EMAIL_ALREADY_EXISTS,
          };
        }
        throw {
          message: err.message
            ? err.message
            : RESPONSE_MESSAGES.ERROR_REGISTER_USER,
        };
      }
      return res.status(200).json({ data: 'Register successful!' });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const { data, err } = await this.authService.login(body);
      if (err) {
        throw {
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_LOGIN,
        };
      }
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-data')
  async getData(@Req() req: RequestWithUserData, @Res() res: Response) {
    return res.status(200).json({
      data: {
        id: req.user.id,
        email: req.user.email,
      },
    });
  }
}
