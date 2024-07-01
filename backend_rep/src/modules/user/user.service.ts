import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { hashSync } from 'bcryptjs';
import { RESPONSE_MESSAGES } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const data = await this.prisma.user.findMany({
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      });
      return { data };
    } catch (err) {
      return { err };
    }
  }

  async get(id: string) {
    try {
      const data = await this.prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      });
      if (!data) {
        throw {
          message: RESPONSE_MESSAGES.ERROR_USER_NOT_FOUND,
        };
      }
      return { data };
    } catch (err) {
      return { err };
    }
  }

  async update(id: string, data: UserUpdateDto) {
    try {
      let updateData: {
        email?: string;
        password?: string;
        role?: {
          connect: {
            name: string;
          };
        };
      } = {};

      if (!data.email && !data.password && !data.role) {
        throw {
          message: RESPONSE_MESSAGES.ERROR_UPDATE_WITHOUT_DATA,
        };
      }
      if (data.password) {
        updateData.password = hashSync(data.password, 10);
      }

      if (data.role) {
        updateData.role = {
          connect: {
            name: data.role,
          },
        };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          role: {
            include: {
              permissions: true,
            },
          },
        },
      });

      return { data: updatedUser };
    } catch (err) {
      return { err };
    }
  }

  async delete(id: string) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });

      return { data: deletedUser };
    } catch (err) {
      return { err };
    }
  }
}
