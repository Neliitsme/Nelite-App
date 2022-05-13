import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    let user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (user) {
      return user;
    }

    throw new UserNotFoundException(userWhereUniqueInput.id);
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2025') {
          throw new UserNotFoundException(where.id);
        }
      }
      throw e;
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2025') {
          throw new UserNotFoundException(where.id);
        }
      }
      throw e;
    }
  }

  //Todo implement
  async updatePassword() {
    return;
  }
}
