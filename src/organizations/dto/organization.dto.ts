import { IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateOrganizationDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsUUID() owner: string;
}
export class UpdateOrganizationDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
}
