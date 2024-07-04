import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}
  @Get('download')
  async getPDF(@Res() res: Response): Promise<void> {
    const buffer = await this.pdfService.generatePDF();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get('view')
  async viewPDF(@Res() res: Response): Promise<void> {
    const buffer = await this.pdfService.generatePDF();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
