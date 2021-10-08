import { CountryDto } from './dto/country.dto';
import { UserError } from '@helper/error.helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { StatusCodes } from '@modules/base/base.interface';
import { CountryRepository } from './constants/countries.repository';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: CountryRepository,
  ) {}

  async create(body: CountryDto): Promise<Country> {
    return await this.countryRepo.save(body);
  }

  async findAll(): Promise<Country[]> {
    return await this.countryRepo.find({ deletedAt: null });
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countryRepo.findOne({ id, deletedAt: null });

    if (!country)
      throw new UserError(StatusCodes.COUNTRY_NOT_FOUND, HttpStatus.NOT_FOUND);

    return country;
  }

  async update(id: number, body: CountryDto): Promise<Country> {
    let country = await this.countryRepo.findOne({ id, deletedAt: null });

    if (!country)
      throw new UserError(StatusCodes.COUNTRY_NOT_FOUND, HttpStatus.NOT_FOUND);

    country = {
      ...country,
      ...body,
    };
    return await this.countryRepo.save(country);
  }

  async delete(id: number): Promise<boolean> {
    const country = await this.countryRepo.findOne({ id, deletedAt: null });

    if (!country)
      throw new UserError(StatusCodes.COUNTRY_NOT_FOUND, HttpStatus.NOT_FOUND);

    country.deletedAt = new Date();
    const data = await this.countryRepo.save(country);

    return !!data;
  }
}
