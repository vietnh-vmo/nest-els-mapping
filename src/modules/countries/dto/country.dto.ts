import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'country name', required: true })
  name: string;
}
