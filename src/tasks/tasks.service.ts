import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AssignEmployeeDto,
  CreateTaskDto,
  UpdateTaskDto,
} from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.project },
    });
    if (!project) throw new NotFoundException('Project not found');
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        projectId: project.id,
        organizationId: project.organizationId,
      },
    });
  }

  async findAll(query: Record<string, string>) {
    const tasks = await this.prisma.task.findMany({
      where: {
        id: query.id,
        title: query.title,
        projectId: query.projectId ?? query.project,
        organizationId: query.organizationId ?? query.org,
      },
    });
    if (!tasks.length) throw new NotFoundException('No task found');
    return tasks;
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  async assign(id: string, dto: AssignEmployeeDto): Promise<void> {
    const task = await this.findOne(id);
    const [user, projectMembership] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: dto.employeeId } }),
      this.prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId: task.projectId,
            userId: dto.employeeId,
          },
        },
      }),
    ]);
    if (!user) throw new NotFoundException('User not found');
    if (!projectMembership) {
      throw new BadRequestException('Employee is not assigned to this project');
    }
    await this.prisma.taskAssignment.upsert({
      where: { taskId_userId: { taskId: id, userId: dto.employeeId } },
      create: { taskId: id, userId: dto.employeeId },
      update: {},
    });
  }

  async assignedEmployees(id: string) {
    await this.findOne(id);
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        assignments: { include: { user: { omit: { password: true } } } },
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.task.delete({ where: { id } });
  }
}
