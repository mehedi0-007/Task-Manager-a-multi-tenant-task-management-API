import { IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateTaskDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsUUID() project: string;
}
export class UpdateTaskDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
}
export class AssignEmployeeDto {
  @IsUUID() employeeId: string;
}
