import {
  IsEmail,
  IsEnum,
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../generated/prisma/client';

export class CreateUserDto {
  @IsString() @MaxLength(20) username: string;
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
}
export class UpdateUserDto {
  @IsOptional() @IsString() @MaxLength(20) username?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MinLength(6) password?: string;
  @IsOptional() @IsUUID() organizationId?: string;
  @IsOptional() @IsEnum(UserRole) role?: UserRole;
}
