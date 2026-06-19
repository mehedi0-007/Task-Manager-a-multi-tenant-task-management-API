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
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Post() async create(@Body() dto: CreateUserDto): Promise<string> {
    await this.users.create(dto);
    return 'User Created';
  }
  @Get() findAll(@Query() query: Record<string, string>) {
    return this.users.findAll(query);
  }
  @Get(':id') findOne(@Param() params: UuidParamDto) {
    return this.users.findOne(params.id);
  }
  @Patch(':id') update(
    @Param() params: UuidParamDto,
    @Body() dto: UpdateUserDto,
  ) {
    return this.users.update(params.id, dto);
  }
  @Delete(':id') @HttpCode(204) remove(@Param() params: UuidParamDto) {
    return this.users.remove(params.id);
  }
}
