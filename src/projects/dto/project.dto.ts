import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateProjectDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsUUID() organization: string;
}
export class UpdateProjectDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
}
export class AssignProjectDto {
  @IsUUID() userId: string;
  @IsIn(['admin', 'employee']) role: 'admin' | 'employee';
}
