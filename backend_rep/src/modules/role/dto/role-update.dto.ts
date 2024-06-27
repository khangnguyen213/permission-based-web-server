import { IsOptional, IsString } from 'class-validator';

export class RoleUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString({ each: true })
  permissions?: string[];
}
