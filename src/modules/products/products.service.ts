import { omit } from 'lodash';
import { UserError } from '@helper/error.helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { getEsSearchQuery } from './products.utils';
import { EntityManager, getConnection } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { productIndex } from './constants/products.index';
import { ListProductsDto } from './dto/list-products.dto';
import { Size } from '@modules/sizes/entities/size.entity';
import { StatusCodes } from '@modules/base/base.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Brand } from '@modules/brands/entities/brand.entity';
import { SearchService } from '@modules/search/search.service';
import { Country } from '@modules/countries/entities/country.entity';
import { ProductsRepository } from './constants/products.repository';
import { SizeRepository } from '@modules/sizes/constants/sizes.repository';
import { BrandsRepository } from '@modules/brands/constants/brands.repository';
import { CountryRepository } from '@modules/countries/constants/countries.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: ProductsRepository,
    @InjectRepository(Brand)
    private readonly brandsRepo: BrandsRepository,
    @InjectRepository(Size)
    private readonly sizeRepo: SizeRepository,
    @InjectRepository(Country)
    private readonly countryRepo: CountryRepository,
    private readonly productEs: SearchService<Product>,
  ) {
    productEs.setEntityIndex(productIndex);
  }

  async create(body: CreateProductDto): Promise<Product> {
    let product;
    const [brands, sizes, countries] = await Promise.all([
      this.brandsRepo
        .createQueryBuilder('brands')
        .where('id IN (:...brandIds) and isnull(deletedAt)', {
          brandIds: body.brandIds,
        })
        .getMany(),
      this.sizeRepo
        .createQueryBuilder('sizes')
        .where('id IN (:...sizeIds) and isnull(deletedAt)', {
          sizeIds: body.sizeIds,
        })
        .getMany(),
      this.countryRepo
        .createQueryBuilder('countries')
        .where('id IN (:...countryIds) and isnull(deletedAt)', {
          countryIds: body.countryIds,
        })
        .getMany(),
    ]);

    if (!brands.length)
      throw new UserError(StatusCodes.BRAND_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (!sizes.length)
      throw new UserError(StatusCodes.SIZE_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (!countries.length)
      throw new UserError(StatusCodes.COUNTRY_NOT_FOUND, HttpStatus.NOT_FOUND);

    await getConnection().transaction(async (entityManager: EntityManager) => {
      product = await entityManager.save(Product, {
        ...omit(body, ['brandIds', 'sizeIds', 'countryIds']),
        brands,
        sizes,
        countries,
      });

      //  insert ES
      await this.productEs.insertDocument(product, product.id);
      return true;
    });

    return (
      product ||
      new UserError(StatusCodes.ES_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR)
    );
  }

  async search(listQuery: ListProductsDto): Promise<Product[]> {
    const body = getEsSearchQuery(listQuery);
    const data: any = await this.productEs.searchDocuments(body);
    return data.body ? data.body.hits.hits : [];
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepo.findOne(
      { id, deletedAt: null },
      { relations: ['brands', 'sizes', 'countries'] },
    );

    if (!product)
      throw new UserError(StatusCodes.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);

    return product;
  }

  async update(id: number, body: UpdateProductDto): Promise<Product> {
    let data;
    const product = await this.productsRepo.findOne(
      { id, deletedAt: null },
      { relations: ['brands', 'sizes', 'countries'] },
    );

    if (!product)
      throw new UserError(StatusCodes.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);

    await getConnection().transaction(async (entityManager: EntityManager) => {
      product.brands = [];
      product.sizes = [];
      product.countries = [];

      const [brands, sizes, countries, _] = await Promise.all([
        this.brandsRepo
          .createQueryBuilder('brands')
          .where('id IN (:...brandIds) and isnull(deletedAt)', {
            brandIds: body.brandIds,
          })
          .getMany(),
        this.sizeRepo
          .createQueryBuilder('sizes')
          .where('id IN (:...sizeIds) and isnull(deletedAt)', {
            sizeIds: body.sizeIds,
          })
          .getMany(),
        this.countryRepo
          .createQueryBuilder('countries')
          .where('id IN (:...countryIds) and isnull(deletedAt)', {
            countryIds: body.countryIds,
          })
          .getMany(),
        entityManager.save(Product, product),
      ]);

      if (!brands.length)
        throw new UserError(StatusCodes.BRAND_NOT_FOUND, HttpStatus.NOT_FOUND);
      if (!sizes.length)
        throw new UserError(StatusCodes.SIZE_NOT_FOUND, HttpStatus.NOT_FOUND);
      if (!countries.length)
        throw new UserError(
          StatusCodes.COUNTRY_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      const updateBody = {
        ...product,
        ...omit(body, ['brandIds', 'sizeIds', 'countryIds']),
        brands,
        sizes,
        countries,
      };

      data = await entityManager.save(Product, updateBody);

      //  update ES
      await this.productEs.updateDocument(updateBody, id);
      return true;
    });

    return (
      data ||
      new UserError(StatusCodes.ES_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR)
    );
  }

  async remove(id: number): Promise<boolean> {
    let data;
    const product = await this.productsRepo.findOne({ id, deletedAt: null });

    if (!product)
      throw new UserError(StatusCodes.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);

    await getConnection().transaction(async (entityManager: EntityManager) => {
      product.deletedAt = new Date();
      data = await entityManager.save(Product, product);

      //  delete ES
      await this.productEs.deleteDocument(id);
      return true;
    });

    return (
      data ||
      new UserError(StatusCodes.ES_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR)
    );
  }
}
