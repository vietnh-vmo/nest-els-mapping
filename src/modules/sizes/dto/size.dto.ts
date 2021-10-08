import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SizeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'size name', required: true })
  name: string;
}
