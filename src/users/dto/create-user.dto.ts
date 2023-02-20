import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'Mikhailo', description: 'user name'})
  readonly name: string;

  @ApiProperty({example: 'user@email.ru', description: 'user email'})
  readonly email: string;

  @ApiProperty({example: '14533', description: 'user password'})
  readonly password: string;
}
