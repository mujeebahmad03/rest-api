import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { ResponseHelperService } from 'src/helper/response-helper.service';
import { ResponseModel } from 'src/models/global.model';
import { CreateUserDto, EditUserDto } from './dto';
import { UserProfileResponseModel } from 'src/models/user-profile.model';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userSingleResponseHelper: ResponseHelperService<UserProfileResponseModel>,
  ) {}

  async createUser(
    userDto: CreateUserDto,
  ): Promise<ResponseModel<UserProfileResponseModel>> {
    const { name, email, password } = userDto;

    const userProfile = await this.prisma.user.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });

    if (userProfile) {
      this.userSingleResponseHelper.returnConflict('User with email exists');
    }

    // generate the password hash
    const hash = await argon.hash(password);

    // Create new user without businessId
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        hashPassword: hash,
      },
    });

    delete user.hashPassword;

    return this.userSingleResponseHelper.returnSuccessObject(
      'User created successfully',
      user,
    );
  }

  async getUser(id: string): Promise<ResponseModel<UserProfileResponseModel>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      this.userSingleResponseHelper.returnNotFound('User not found');
    }

    delete user.hashPassword;

    return this.userSingleResponseHelper.returnSuccessObject(
      'User fetched successfully',
      user,
    );
  }

  async editUser(
    id: string,
    dto: EditUserDto,
  ): Promise<ResponseModel<UserProfileResponseModel>> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      this.userSingleResponseHelper.returnNotFound('User not found');
    }

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    delete user.hashPassword;

    return this.userSingleResponseHelper.returnSuccessObject(
      'User updated successfully',
      user,
    );
  }
}
