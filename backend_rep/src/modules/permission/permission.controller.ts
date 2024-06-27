import { Controller, Get, Res } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Response } from 'express';
import { RESPONSE_MESSAGES } from 'src/common/constants';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const { data, err } = await this.permissionService.getAll();
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
}
