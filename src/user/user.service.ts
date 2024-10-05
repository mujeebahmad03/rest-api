import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseHelperService } from 'src/helper/response-helper.service';
import { ResponseModel } from 'src/models/global.model';
import { User } from '@prisma/client';
import { RequestSchema } from 'src/types/request.schema';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userSingleResponseHelper: ResponseHelperService<User>,
    private adminSingleResponseHelper: ResponseHelperService<User>,
    private adminMultiResponseHelper: ResponseHelperService<User[]>,
  ) {}

  async getUser(req: RequestSchema): Promise<ResponseModel<User>> {
    const { userId } = req;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      this.userSingleResponseHelper.returnNotFound('User not found');
    }

    return this.userSingleResponseHelper.returnSuccessObject(
      'User fetched successfully',
      user,
    );
  }

  async getAllUsers(): Promise<ResponseModel<User[]>> {
    const users = await this.prisma.user.findMany();

    if (users.length === 0) {
      this.adminSingleResponseHelper.returnNotFound('No user found');
    }

    return this.adminMultiResponseHelper.returnSuccessObject(
      'Users fetched successfully',
      users,
    );
  }

  async getUserById(userId: string): Promise<ResponseModel<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      this.adminSingleResponseHelper.returnNotFound('User not found');
    }

    return this.adminSingleResponseHelper.returnSuccessObject(
      'User fetched successfully',
      user,
    );
  }

  async editUser(
    req: RequestSchema,
    dto: EditUserDto,
  ): Promise<ResponseModel<User>> {
    const { userId } = req;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      this.userSingleResponseHelper.returnNotFound('User not found');
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    return this.userSingleResponseHelper.returnSuccessObject(
      'User updated successfully',
      user,
    );
  }

  async deleteUser(userId: string): Promise<ResponseModel<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      this.adminSingleResponseHelper.returnNotFound('User not found');
    }

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return this.adminSingleResponseHelper.returnSuccessObject(
      'User deleted successfully',
    );
  }
}
