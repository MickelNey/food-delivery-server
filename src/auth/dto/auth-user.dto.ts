import {ApiProperty} from "@nestjs/swagger";

export class AuthUserDto {

  @ApiProperty({example: 'user@email.ru', description: 'user email'})
  readonly email: string;

  @ApiProperty({example: '14533', description: 'user password'})
  readonly password: string;
}