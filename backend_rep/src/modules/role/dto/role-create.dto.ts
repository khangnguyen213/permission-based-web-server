import { IsString } from 'class-validator';

export class RoleCreateDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  permissions: string[];
}
