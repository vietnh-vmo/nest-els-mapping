import { Module } from '@nestjs/common';
import { Size } from './entities/size.entity';
import { SizeService } from './sizes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeController } from './sizes.controller';
import { SizeRepository } from './constants/sizes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizeController],
  providers: [SizeService, SizeRepository],
  exports: [SizesModule],
})
export class SizesModule {}
