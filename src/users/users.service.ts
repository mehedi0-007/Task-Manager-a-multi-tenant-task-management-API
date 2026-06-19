import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Prisma, UserRole } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

const safeUserSelect = {
  id: true,
  username: true,
  email: true,
  role: true,
  organizationId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email.toLowerCase(),
          password: await bcrypt.hash(dto.password, 12),
        },
        select: safeUserSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('User exists with same email');
      }
      throw error;
    }
  }

  async findAll(query: Record<string, string>) {
    const role = Object.values(UserRole).includes(query.role as UserRole)
      ? (query.role as UserRole)
      : undefined;
    const users = await this.prisma.user.findMany({
      where: {
        email: query.email,
        username: query.username,
        organizationId: query.organizationId ?? query.org,
        role,
      },
      select: safeUserSelect,
    });
    if (!users.length) throw new NotFoundException('No user found right now');
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: safeUserSelect,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, password: true },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: {
        username: dto.username,
        email: dto.email?.toLowerCase(),
        password: dto.password
          ? await bcrypt.hash(dto.password, 12)
          : undefined,
        organizationId: dto.organizationId,
        role: dto.role,
      },
      select: safeUserSelect,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Organization owners cannot be deleted before ownership is transferred',
        );
      }
      throw error;
    }
  }
}
