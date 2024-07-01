import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { RESPONSE_MESSAGES, ROLE_PERMISSIONS } from 'src/common/constants';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/permission.guard';
import { Permission } from '../auth/permission.decorator';
import { AllowSelf } from '../auth/allow-self.decorator';
import { UserUpdateDto } from './dto/user-update.dto';
import { isPrismaError } from 'src/common/utils';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.USER_READ)
  @Get()
  async getAll(@Res() res: Response) {
    try {
      const { data, err } = await this.userService.getAll();
      if (err) {
        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }

  @Get(':userId')
  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.USER_READ)
  @AllowSelf()
  async get(@Param('userId') id: string, @Res() res: Response) {
    try {
      const { data, err } = await this.userService.get(id);
      if (err) {
        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }

  @Put(':userId')
  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.USER_UPDATE)
  @AllowSelf()
  async update(
    @Param('userId') id: string,
    @Body() body: UserUpdateDto,
    @Res() res: Response,
  ) {
    try {
      const { data, err } = await this.userService.update(id, body);
      if (err) {
        if (isPrismaError(err, 'P2025')) {
          if (err.meta.cause === 'Record to update not found.') {
            return res.status(500).json({
              message: RESPONSE_MESSAGES.ERROR_USER_NOT_FOUND,
            });
          }

          if (err.meta.cause.match(/No 'Role' record\(s\)/)) {
            return res.status(400).json({
              message: RESPONSE_MESSAGES.ERROR_ROLE_NOT_FOUND,
            });
          }
        }
        if (isPrismaError(err, 'P2002')) {
          return res.status(400).json({
            message: RESPONSE_MESSAGES.ERROR_EMAIL_ALREADY_EXISTS,
          });
        }

        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }

  @Delete(':userId')
  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.USER_DELETE)
  @AllowSelf()
  async delete(@Param('userId') id: string, @Res() res: Response) {
    try {
      const { err } = await this.userService.delete(id);
      if (err) {
        if (isPrismaError(err, 'P2025')) {
          return res.status(500).json({
            message: RESPONSE_MESSAGES.ERROR_USER_NOT_FOUND,
          });
        }
        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(200).json({ data: 'User deleted' });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }
}
