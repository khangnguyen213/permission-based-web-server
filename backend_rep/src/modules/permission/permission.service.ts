import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      const data = await this.prisma.permission.findMany();
      return { data };
    } catch (err) {
      return { err };
    }
  }
}
