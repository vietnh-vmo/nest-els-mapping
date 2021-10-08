import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ElasticSearchDto {
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsNumber()
  from: number;

  sort?: Array<any>;

  filter?: any;

  @IsString()
  query?: any;
}
