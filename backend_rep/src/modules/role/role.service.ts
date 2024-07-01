import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RoleCreateDto) {
    try {
      const role = await this.prisma.role.create({
        data: {
          name: data.name.toUpperCase(),
          permissions: {
            connect: data.permissions.map((permission) => ({
              name: permission,
            })),
          },
        },
        include: {
          permissions: true,
        },
      });
      return { data: role };
    } catch (err) {
      return { err };
    }
  }

  async getAll() {
    try {
      const data = await this.prisma.role.findMany({
        include: {
          permissions: true,
        },
      });
      return { data };
    } catch (err) {
      return { err };
    }
  }

  async get(name: string) {
    try {
      const data = await this.prisma.role.findUnique({
        where: { name },
        include: {
          permissions: true,
        },
      });

      if (!data) {
        throw {
          message: RESPONSE_MESSAGES.ERROR_ROLE_NOT_FOUND,
        };
      }
      return { data };
    } catch (err) {
      return { err };
    }
  }

  async update(name: string, data: RoleUpdateDto) {
    try {
      if (!data.name && !data.permissions) {
        throw {
          message: RESPONSE_MESSAGES.ERROR_UPDATE_WITHOUT_DATA,
        };
      }

      const updateData: Prisma.RoleUpdateInput = {};

      if (data.name) {
        updateData.name = data.name.toUpperCase();
      }
      if (data.permissions) {
        updateData.permissions = {
          set: data.permissions.map((permission) => ({
            name: permission,
          })),
        };
      }
      const role = await this.prisma.role.update({
        where: { name },
        data: updateData,
        include: {
          permissions: true,
        },
      });
      return { data: role };
    } catch (err) {
      return { err };
    }
  }

  async delete(name: string) {
    try {
      const role = await this.prisma.role.delete({
        where: { name },
      });
      return { data: role };
    } catch (err) {
      return { err };
    }
  }
}
