import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'The email of new user.',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'super_secret_password',
    description: 'The password of new user.',
    type: String,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Ime Sam',
    description: 'The full name of new user.',
    type: String,
  })
  @IsNotEmpty()
  name: string;
}
