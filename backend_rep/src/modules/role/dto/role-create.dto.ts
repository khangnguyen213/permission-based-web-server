import { IsNotEmpty, IsString } from 'class-validator';

export class RoleCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({ each: true })
  permissions: string[];
}
