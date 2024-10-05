import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  @ApiProperty({
    title: 'Name',
    description:
      'Full Name of User to be created. Separate each name by whitespace',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({
    title: 'Email',
    description: 'Email of User to be created',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 12, { message: 'Password has to be between 8 and 12 chars' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is weak',
  })
  @ApiProperty({
    title: 'Password',
    description: 'Password of account to be created',
  })
  password: string;
}

export class EditUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(30)
  @MinLength(3)
  @ApiPropertyOptional({
    title: 'Name',
    description: 'User Full Name',
  })
  name?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @ApiPropertyOptional({
    title: 'Email',
    description: 'Email of the User',
  })
  email?: string;
}
