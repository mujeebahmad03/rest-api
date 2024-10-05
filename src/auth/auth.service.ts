import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { ResponseModel } from 'src/models/global.model';

import { JWTRequestType } from 'src/models/jwt-payload.model';
import { HelperService } from 'src/helper/helper.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { JWTHelperService } from 'src/helper/jwt-helper.service';
import { ResponseHelperService } from 'src/helper/response-helper.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private signInResponseHelper: ResponseHelperService<User>,
    private signUpResponseHelper: ResponseHelperService<User>,
    private jwtHelperService: JWTHelperService,
    private helperService: HelperService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto): Promise<ResponseModel<User>> {
    const { name, email, password } = dto;

    const userProfile = await this.prisma.user.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });

    // Checks if email is registered
    if (userProfile) {
      this.signUpResponseHelper.returnConflict('User with email exists');
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

    return this.signUpResponseHelper.returnSuccessObject(
      'Account created successfully',
      user,
    );
  }

  async signin(dto: SignInDto, res: Response<ResponseModel<User>>) {
    const { email, password } = dto;
    // find user by email
    const user = await this.prisma.user.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });

    // if user does not exist throw exception
    if (!user)
      this.signInResponseHelper.returnBadRequest('Incorrect email or password');
    // compare password
    const pwMatches = await argon.verify(user.hashPassword, password);
    // if password is incorrect throw exception
    if (!pwMatches)
      this.signInResponseHelper.returnBadRequest('Incorrect email or password');

    const token = await this.generateToken(user.id);

    // send back the user signin token
    res.cookie('token', token);

    return res.send(
      this.verifyResponseHelper.returnSuccessObject('Logged in successfully', {
        token: token,
      }),
    );
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Signed out successfully' });
  }

  async generateToken(userId: string): Promise<string> {
    const token = await this.jwtHelperService.signToken(
      {
        userId,
        requestType: JWTRequestType.Login,
      },
      this.config.get<string>('USER_LOGIN_DURATION'),
    );

    return token;
  }
}
