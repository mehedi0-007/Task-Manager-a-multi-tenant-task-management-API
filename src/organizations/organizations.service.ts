import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dto/organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrganizationDto) {
    const owner = await this.prisma.user.findUnique({
      where: { id: dto.owner },
    });
    if (!owner) throw new NotFoundException('Owner not found');
    return this.prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          title: dto.title,
          description: dto.description,
          ownerId: dto.owner,
        },
      });
      await tx.user.update({
        where: { id: dto.owner },
        data: { organizationId: organization.id, role: UserRole.owner },
      });
      return organization;
    });
  }

  async findOne(id: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        projects: true,
        rootAdmins: { include: { user: { omit: { password: true } } } },
      },
    });
    if (!organization) throw new NotFoundException('Organization not found');
    return organization;
  }

  async update(id: string, dto: UpdateOrganizationDto) {
    await this.findOne(id);
    return this.prisma.organization.update({ where: { id }, data: dto });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.organization.delete({ where: { id } });
  }
}
