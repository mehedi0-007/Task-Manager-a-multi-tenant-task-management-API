import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectRole, UserRole } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  AssignProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
} from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    if (
      !(await this.prisma.organization.findUnique({
        where: { id: dto.organization },
      }))
    ) {
      throw new NotFoundException('Organization not found');
    }
    return this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        organizationId: dto.organization,
      },
    });
  }

  findAll(query: Record<string, string>) {
    return this.prisma.project.findMany({
      where: {
        id: query.id,
        title: query.title,
        organizationId: query.organizationId ?? query.organization,
      },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async tasksFor(id: string) {
    await this.findOne(id);
    return this.prisma.task.findMany({ where: { projectId: id } });
  }

  async members(id: string) {
    await this.findOne(id);
    return this.prisma.projectMember.findMany({
      where: { projectId: id },
      include: { user: { omit: { password: true } } },
    });
  }

  async assign(id: string, dto: AssignProjectDto): Promise<void> {
    const [project, user] = await Promise.all([
      this.findOne(id),
      this.prisma.user.findUnique({ where: { id: dto.userId } }),
    ]);
    if (!user) throw new NotFoundException('User not found');
    if (user.organizationId !== project.organizationId) {
      throw new BadRequestException(
        'User and project must belong to the same organization',
      );
    }
    const projectRole =
      dto.role === 'admin' ? ProjectRole.admin : ProjectRole.employee;
    const userRole = dto.role === 'admin' ? UserRole.admin : UserRole.employee;
    await this.prisma.$transaction([
      this.prisma.projectMember.upsert({
        where: { projectId_userId: { projectId: id, userId: dto.userId } },
        create: { projectId: id, userId: dto.userId, role: projectRole },
        update: { role: projectRole },
      }),
      this.prisma.user.update({
        where: { id: dto.userId },
        data: { role: userRole },
      }),
    ]);
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
  }
}
