import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { CountryDto } from './dto/country.dto';
import { Country } from './entities/country.entity';
import { CountryService } from './countries.service';
import { StatusCodes } from '@modules/base/base.interface';
import { BaseResponse } from '@modules/base/dto/base-response.dto';
import { ListResponse } from '@modules/base/dto/list-response.dto';
import { BooleanResponse } from '@modules/base/dto/bool-response.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(@Body() body: CountryDto): Promise<BaseResponse<Country>> {
    const data = await this.countryService.create(body);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Get()
  async findAll(): Promise<ListResponse<Country>> {
    const data = await this.countryService.findAll();

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponse<Country>> {
    const data = await this.countryService.findOne(+id);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CountryDto,
  ): Promise<BaseResponse<Country>> {
    const data = await this.countryService.update(+id, body);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BooleanResponse> {
    const data = await this.countryService.delete(+id);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }
}
