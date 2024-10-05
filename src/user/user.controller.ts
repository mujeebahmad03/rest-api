import {
  Body,
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Put,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseModel } from 'src/models/global.model';
import { UserProfileResponseModel } from 'src/models/user-profile.model';
import { CreateUserDto, EditUserDto } from './dto';

@ApiTags('users')
@Controller('users')
@ApiExtraModels(ResponseModel, UserProfileResponseModel)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseModel) },
        {
          properties: {
            data: { $ref: getSchemaPath(UserProfileResponseModel) },
          },
        },
      ],
    },
    status: 200,
  })
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseModel) },
        {
          properties: {
            data: { $ref: getSchemaPath(UserProfileResponseModel) },
          },
        },
      ],
    },
    status: 200,
  })
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: EditUserDto })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseModel) },
        {
          properties: {
            data: { $ref: getSchemaPath(UserProfileResponseModel) },
          },
        },
      ],
    },
    status: 200,
  })
  async editUser(@Param('id') id: string, @Body() dto: EditUserDto) {
    return await this.usersService.editUser(id, dto);
  }
}
