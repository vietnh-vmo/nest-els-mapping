import { Brand } from './entities/brand.entity';
import { BrandDto } from './dto/create-brand.dto';
import { UserError } from '@helper/error.helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { StatusCodes } from '@modules/base/base.interface';
import { BrandsRepository } from './constants/brands.repository';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepo: BrandsRepository,
  ) {}

  async create(body: BrandDto): Promise<Brand> {
    return await this.brandsRepo.save(body);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandsRepo.find({ deletedAt: null });
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandsRepo.findOne({ id, deletedAt: null });

    if (!brand)
      throw new UserError(StatusCodes.BRAND_NOT_FOUND, HttpStatus.NOT_FOUND);

    return brand;
  }

  async update(id: number, body: BrandDto): Promise<Brand> {
    let brand = await this.brandsRepo.findOne({ id, deletedAt: null });

    if (!brand)
      throw new UserError(StatusCodes.BRAND_NOT_FOUND, HttpStatus.NOT_FOUND);

    brand = {
      ...brand,
      ...body,
    };
    return await this.brandsRepo.save(brand);
  }

  async delete(id: number): Promise<boolean> {
    const brand = await this.brandsRepo.findOne({ id, deletedAt: null });

    if (!brand)
      throw new UserError(StatusCodes.BRAND_NOT_FOUND, HttpStatus.NOT_FOUND);

    brand.deletedAt = new Date();
    const data = await this.brandsRepo.save(brand);

    return !!data;
  }
}
