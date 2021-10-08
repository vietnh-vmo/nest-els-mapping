import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  BaseGender,
  BaseStatus,
  BaseCondition,
} from '@modules/base/base.interface';
import { Size } from '@modules/sizes/entities/size.entity';
import { Brand } from '@modules/brands/entities/brand.entity';
import { Country } from '@modules/countries/entities/country.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: BaseGender.UNISEX })
  gender: BaseGender;

  @Column({ default: BaseCondition.IN_STOCK })
  condition: BaseCondition;

  @Column({ default: BaseStatus.ACTIVE })
  status: BaseStatus;

  @Column({ default: true })
  isNew: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: null })
  deletedAt: Date;

  @ManyToMany(() => Brand)
  @JoinTable({ name: 'product_brand' })
  brands: Brand[];

  @ManyToMany(() => Size)
  @JoinTable({ name: 'product_size' })
  sizes: Size[];

  @ManyToMany(() => Country)
  @JoinTable({ name: 'product_country' })
  countries: Country[];
}
