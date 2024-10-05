import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseModel {
  @ApiProperty({
    title: 'User ID',
    description: 'The ID of the User',
  })
  id: string;

  @ApiProperty({
    title: 'Full name',
    description: 'The name of the User',
  })
  name: string;

  @ApiProperty({
    title: 'Email',
    description: 'The email of the User',
  })
  email: string;
}
