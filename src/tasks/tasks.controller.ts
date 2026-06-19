import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UuidParamDto } from '../common/dto/uuid-param.dto';
import {
  AssignEmployeeDto,
  CreateTaskDto,
  UpdateTaskDto,
} from './dto/task.dto';
import { TasksService } from './tasks.service';
@Controller('task')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}
  @Post() create(@Body() dto: CreateTaskDto) {
    return this.tasks.create(dto);
  }
  @Get() findAll(@Query() query: Record<string, string>) {
    return this.tasks.findAll(query);
  }
  @Get(':id/employees') employees(@Param() params: UuidParamDto) {
    return this.tasks.assignedEmployees(params.id);
  }
  @Post(':id/assign') assign(
    @Param() params: UuidParamDto,
    @Body() dto: AssignEmployeeDto,
  ) {
    return this.tasks.assign(params.id, dto);
  }
  @Get(':id') findOne(@Param() params: UuidParamDto) {
    return this.tasks.findOne(params.id);
  }
  @Patch(':id') update(
    @Param() params: UuidParamDto,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasks.update(params.id, dto);
  }
  @Delete(':id') @HttpCode(204) remove(@Param() params: UuidParamDto) {
    return this.tasks.remove(params.id);
  }
}
