import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@configs/database.configs';
import { SizesModule } from '@modules/sizes/sizes.module';
import { BrandsModule } from '@modules/brands/brands.module';
import { SearchModule } from '@modules/search/search.module';
import { ProductsModule } from '@modules/products/products.module';
import { CountryModule } from '@modules/countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig()),
    SearchModule,
    ProductsModule,
    BrandsModule,
    SizesModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
