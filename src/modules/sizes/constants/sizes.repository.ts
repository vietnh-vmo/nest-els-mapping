import { Size } from '../entities/size.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Size)
export class SizeRepository extends Repository<Size> {}
