import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumberString,
  IsBooleanString,
} from 'class-validator';
import {
  BaseGender,
  SortStatus,
  BaseCondition,
} from '@modules/base/base.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ListProductsDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ description: 'page', example: 1 })
  page: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ description: 'limit', example: 5 })
  limit: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'sort createdAt', example: 'asc' })
  sortCreatedAt: SortStatus;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'sort price', example: 'asc' })
  sortPrice: SortStatus;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'filter price range (min)',
    example: 0,
  })
  fPriceRangeMin: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'filter price range (max)',
    example: 1000,
  })
  fPriceRangeMax: number;

  @IsOptional()
  @IsBooleanString()
  @ApiProperty({
    description: 'filter isNew',
    example: true,
  })
  fIsNew: boolean;

  @IsOptional()
  @IsEnum(BaseGender)
  @ApiProperty({
    description: 'filter gender',
    example: BaseGender.UNISEX,
  })
  fGender: BaseGender;

  @IsOptional()
  @IsEnum(BaseCondition)
  @ApiProperty({
    description: 'filter condition',
    example: BaseCondition.IN_STOCK,
  })
  fCondition: BaseCondition;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'search string', example: 'product' })
  search: string;
}
