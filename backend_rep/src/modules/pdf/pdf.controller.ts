import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { RequestWithUserData } from 'src/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/permission.guard';
import { ROLE_PERMISSIONS } from 'src/common/constants';
import { Permission } from '../auth/permission.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}
  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.REPORT_GENERATE)
  @Get('download')
  async getPDF(
    @Req() req: RequestWithUserData,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.pdfService.generatePDF({
      generator: req.user.email,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.REPORT_GENERATE)
  @Get('view')
  async viewPDF(
    @Req() req: RequestWithUserData,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.pdfService.generatePDF({
      generator: req.user.email,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
