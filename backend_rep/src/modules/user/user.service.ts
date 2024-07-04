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
        select: {
          id: true,
          email: true,
          roles: {
            select: {
              name: true,
              permissions: true,
            },
          },
          createdAt: true,
          updatedAt: true,
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
        select: {
          id: true,
          email: true,
          roles: {
            select: {
              name: true,
              permissions: true,
            },
          },
          createdAt: true,
          updatedAt: true,
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
        roles?: {
          set: {
            name: string;
          }[];
        };
      } = {};

      if (!data.email && !data.password && !data.roles) {
        throw {
          message: RESPONSE_MESSAGES.ERROR_UPDATE_WITHOUT_DATA,
        };
      }

      if (data.email) {
        updateData.email = data.email;
      }

      if (data.password) {
        updateData.password = hashSync(data.password, 10);
      }

      if (data.roles) {
        updateData.roles = {
          set: data.roles.map((role) => ({
            name: role.toUpperCase(),
          })),
        };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          roles: {
            select: {
              name: true,
              permissions: true,
            },
          },
          createdAt: true,
          updatedAt: true,
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
