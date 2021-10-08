import {
  IsEnum,
  IsArray,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import {
  BaseGender,
  BaseStatus,
  BaseCondition,
} from '@modules/base/base.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'product name', required: true })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'product price', required: true })
  price: number;

  @IsNotEmpty()
  @IsEnum(BaseGender)
  @ApiProperty({ description: 'product gender', required: true })
  gender: BaseGender;

  @IsNotEmpty()
  @IsEnum(BaseCondition)
  @ApiProperty({ description: 'product condition', required: true })
  condition: BaseCondition;

  @IsNotEmpty()
  @IsEnum(BaseStatus)
  @ApiProperty({ description: 'product status', required: true })
  status: BaseStatus;

  @IsNotEmpty()
  @ApiProperty({ description: 'product isNew', required: true })
  isNew: boolean;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: 'product brandId', required: true })
  brandIds: [number];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: 'product sizeId', required: true })
  sizeIds: [number];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: 'product countryId', required: true })
  countryIds: [number];
}
