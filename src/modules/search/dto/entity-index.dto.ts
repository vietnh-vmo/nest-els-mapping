import { IsNotEmpty, IsString } from 'class-validator';

export class EntityIndex {
  @IsNotEmpty()
  @IsString()
  index: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
