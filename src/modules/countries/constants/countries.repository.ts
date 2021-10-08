import { Country } from '../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {}
