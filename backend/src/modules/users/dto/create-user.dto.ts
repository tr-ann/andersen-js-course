import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserDto } from './update-user.dto';

export class CreateUserDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  login: string;
}
