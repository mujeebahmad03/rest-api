import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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
}
