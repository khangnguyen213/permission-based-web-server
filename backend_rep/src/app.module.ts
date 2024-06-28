import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [PrismaModule, UserModule, RoleModule, AuthModule, PermissionModule],
  controllers: [AppController],
})
export class AppModule {}
