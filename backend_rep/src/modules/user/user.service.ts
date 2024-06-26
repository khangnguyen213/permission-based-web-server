import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const data = await this.prisma.user.findMany();
      return { data };
    } catch (err) {
      return { err };
    }
  }
}
