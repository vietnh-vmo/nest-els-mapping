import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { CountryService } from './countries.service';
import { CountryController } from './countries.controller';
import { CountryRepository } from './constants/countries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService, CountryRepository],
  exports: [CountryModule],
})
export class CountryModule {}
