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
  AssignProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
} from './dto/project.dto';
import { ProjectsService } from './projects.service';
@Controller('project')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}
  @Post() create(@Body() dto: CreateProjectDto) {
    return this.projects.create(dto);
  }
  @Get() findAll(@Query() query: Record<string, string>) {
    return this.projects.findAll(query);
  }
  @Get(':id/tasks') tasks(@Param() params: UuidParamDto) {
    return this.projects.tasksFor(params.id);
  }
  @Post(':id/assign') assign(
    @Param() params: UuidParamDto,
    @Body() dto: AssignProjectDto,
  ) {
    return this.projects.assign(params.id, dto);
  }
  @Get(':id/members') members(@Param() params: UuidParamDto) {
    return this.projects.members(params.id);
  }
  @Get(':id') findOne(@Param() params: UuidParamDto) {
    return this.projects.findOne(params.id);
  }
  @Patch(':id') update(
    @Param() params: UuidParamDto,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projects.update(params.id, dto);
  }
  @Delete(':id') @HttpCode(204) remove(@Param() params: UuidParamDto) {
    return this.projects.remove(params.id);
  }
}
