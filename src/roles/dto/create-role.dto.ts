import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

  @ApiProperty({example: 'ADMIN', description: 'value of the user role'})
  readonly value: string;

  @ApiProperty({example: 'administrator', description: 'role description'})
  readonly description: string;
}
