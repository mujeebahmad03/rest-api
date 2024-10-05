import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  @ApiProperty({
    title: 'Account FullName',
    description:
      'Full Name of User to be created. Separate each name by whitespace',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({
    title: 'Account Email',
    description: 'Email of User to be created',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20, { message: 'Password has to be between 3 and 20 chars' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is weak',
  })
  @ApiProperty({
    title: 'Account Password',
    description: 'Password of account to be created',
  })
  password: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({
    title: 'Email',
    description: 'User Email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Password',
    description: 'User Password',
  })
  password: string;
}
