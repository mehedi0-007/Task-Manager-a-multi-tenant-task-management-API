import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UuidParamDto } from '../common/dto/uuid-param.dto';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dto/organization.dto';
import { OrganizationsService } from './organizations.service';
@Controller('org')
export class OrganizationsController {
  constructor(private readonly organizations: OrganizationsService) {}
  @Post('createOrg') create(@Body() dto: CreateOrganizationDto) {
    return this.organizations.create(dto);
  }
  @Get('getOrg/:id') findOne(@Param() params: UuidParamDto) {
    return this.organizations.findOne(params.id);
  }
  @Put('updateOrg/:id') updateLegacy(
    @Param() params: UuidParamDto,
    @Body() dto: UpdateOrganizationDto,
  ) {
    return this.organizations.update(params.id, dto);
  }
  @Patch(':id') update(
    @Param() params: UuidParamDto,
    @Body() dto: UpdateOrganizationDto,
  ) {
    return this.organizations.update(params.id, dto);
  }
  @Delete('deleteOrg/:id') @HttpCode(204) remove(
    @Param() params: UuidParamDto,
  ) {
    return this.organizations.remove(params.id);
  }
}
