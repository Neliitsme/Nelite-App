import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaceDto {
  @ApiProperty({
    name: 'userId',
    type: 'integer',
    description: 'id of a user that place is rented to',
  })
  @IsNumber()
  userId: number;
}
