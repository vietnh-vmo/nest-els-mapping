import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { SizeDto } from './dto/size.dto';
import { Size } from './entities/size.entity';
import { SizeService } from './sizes.service';
import { StatusCodes } from '@modules/base/base.interface';
import { BaseResponse } from '@modules/base/dto/base-response.dto';
import { ListResponse } from '@modules/base/dto/list-response.dto';
import { BooleanResponse } from '@modules/base/dto/bool-response.dto';

@Controller('sizes')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  async create(@Body() body: SizeDto): Promise<BaseResponse<Size>> {
    const data = await this.sizeService.create(body);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Get()
  async findAll(): Promise<ListResponse<Size>> {
    const data = await this.sizeService.findAll();

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponse<Size>> {
    const data = await this.sizeService.findOne(+id);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: SizeDto,
  ): Promise<BaseResponse<Size>> {
    const data = await this.sizeService.update(+id, body);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BooleanResponse> {
    const data = await this.sizeService.delete(+id);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }
}
