import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Response } from 'express';
import { RESPONSE_MESSAGES, ROLE_PERMISSIONS } from 'src/common/constants';
import { isPrismaError } from 'src/common/utils';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/permission.guard';
import { Permission } from '../auth/permission.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.ROLE_CREATE)
  @Post()
  async create(@Body() data: RoleCreateDto, @Res() res: Response) {
    try {
      const { data: role, err } = await this.roleService.create(data);
      if (err) {
        if (isPrismaError(err, 'P2002')) {
          return res.status(400).json({
            message: RESPONSE_MESSAGES.ERROR_ROLE_ALREADY_EXISTS,
          });
        }
        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(201).json({ data: role });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.ROLE_READ)
  @Get()
  async getAll(@Res() res: Response) {
    try {
      const { data, err } = await this.roleService.getAll();
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

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.ROLE_READ)
  @Get(':roleName')
  async get(@Param('roleName') roleName: string, @Res() res: Response) {
    try {
      const { data, err } = await this.roleService.get(roleName.toUpperCase());
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

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.ROLE_UPDATE)
  @Put(':roleName')
  async update(
    @Param('roleName') roleName: string,
    @Body() data: RoleUpdateDto,
    @Res() res: Response,
  ) {
    try {
      const { data: role, err } = await this.roleService.update(
        roleName.toUpperCase(),
        data,
      );
      if (err) {
        if (isPrismaError(err, 'P2025')) {
          if (err.meta.cause === 'Record to update not found.') {
            return res.status(500).json({
              message: RESPONSE_MESSAGES.ERROR_ROLE_NOT_FOUND,
            });
          }

          if (
            err.meta.cause.match(
              /Expected \d+ records to be connected, found only \d+\./,
            )
          ) {
            return res.status(400).json({
              message: RESPONSE_MESSAGES.ERROR_PERMISSION_NOT_FOUND,
            });
          }
        }

        if (isPrismaError(err, 'P2002')) {
          return res.status(400).json({
            message: RESPONSE_MESSAGES.ERROR_ROLE_ALREADY_EXISTS,
          });
        }

        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(200).json({ data: role });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.ROLE_DELETE)
  @Delete(':roleName')
  async delete(@Param('roleName') roleName: string, @Res() res: Response) {
    try {
      const { err } = await this.roleService.delete(roleName.toUpperCase());
      if (err) {
        if (isPrismaError(err, 'P2025')) {
          return res.status(500).json({
            message: RESPONSE_MESSAGES.ERROR_ROLE_NOT_FOUND,
          });
        }
        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(200).json({ message: 'Role deleted' });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }
}
