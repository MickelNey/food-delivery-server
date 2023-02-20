import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {

  @ApiProperty({example: 'ADMIN', description: 'role'})
  readonly value: string;

  @ApiProperty({example: '1', description: 'user id'})
  readonly userId: number;
}
