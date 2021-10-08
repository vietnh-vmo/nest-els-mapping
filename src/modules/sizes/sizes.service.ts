import { SizeDto } from './dto/size.dto';
import { Size } from './entities/size.entity';
import { UserError } from '@helper/error.helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { StatusCodes } from '@modules/base/base.interface';
import { SizeRepository } from './constants/sizes.repository';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly SizeRepo: SizeRepository,
  ) {}

  async create(body: SizeDto): Promise<Size> {
    return await this.SizeRepo.save(body);
  }

  async findAll(): Promise<Size[]> {
    return await this.SizeRepo.find({ deletedAt: null });
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.SizeRepo.findOne({ id, deletedAt: null });

    if (!size)
      throw new UserError(StatusCodes.SIZE_NOT_FOUND, HttpStatus.NOT_FOUND);

    return size;
  }

  async update(id: number, body: SizeDto): Promise<Size> {
    let size = await this.SizeRepo.findOne({ id, deletedAt: null });

    if (!size)
      throw new UserError(StatusCodes.SIZE_NOT_FOUND, HttpStatus.NOT_FOUND);

    size = {
      ...size,
      ...body,
    };
    return await this.SizeRepo.save(size);
  }

  async delete(id: number): Promise<boolean> {
    const size = await this.SizeRepo.findOne({ id, deletedAt: null });

    if (!size)
      throw new UserError(StatusCodes.SIZE_NOT_FOUND, HttpStatus.NOT_FOUND);

    size.deletedAt = new Date();
    const data = await this.SizeRepo.save(size);

    return !!data;
  }
}
