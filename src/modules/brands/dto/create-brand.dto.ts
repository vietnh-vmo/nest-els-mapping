import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'brand name', required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'brand isNew', required: true })
  isNew: boolean;
}
