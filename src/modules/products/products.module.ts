import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { productIndex } from './constants/products.index';
import { Size } from '@modules/sizes/entities/size.entity';
import { ProductsController } from './products.controller';
import { SearchModule } from '@modules/search/search.module';
import { Brand } from '@modules/brands/entities/brand.entity';
import { SearchService } from '@modules/search/search.service';
import { ProductsRepository } from './constants/products.repository';
import { Country } from '@modules/countries/entities/country.entity';
import { ProductMappingProps } from './constants/products.mapping';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand, Size, Country]),
    SearchModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(private readonly es: SearchService<Product>) {}
  onModuleInit() {
    this.es.mapIndex(productIndex, ProductMappingProps);
  }
}
