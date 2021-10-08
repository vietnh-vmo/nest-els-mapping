import { UserError } from '@helper/error.helpers';
import { EntityIndex } from './dto/entity-index.dto';
import { ElasticSearchDto } from './dto/es-body.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { StatusCodes } from '@modules/base/base.interface';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService<T> {
  private entityIndex: EntityIndex;
  constructor(private readonly esService: ElasticsearchService) {}

  setEntityIndex(entityIndex: EntityIndex) {
    this.entityIndex = entityIndex;
  }

  async mapIndex({ index, type }: EntityIndex, props) {
    const indexExists = await this.esService.indices.exists({ index });

    if (!indexExists.body) {
      await this.esService.indices.create({ index });

      await this.esService.indices.putMapping({
        index,
        type,
        body: {
          properties: {
            ...props,
            createdAt: { type: 'date' },
            updatedAt: { type: 'date' },
            deletedAt: { type: 'date' },
          },
        },
        include_type_name: true,
      });
    }
  }

  async insertDocument(entity: T, id: number) {
    try {
      const data = this.entityDocument(entity, id);
      return await this.esService.bulk(data);
    } catch (error) {
      throw new UserError(
        StatusCodes.ES_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateDocument(entity: T, id: number) {
    try {
      await this.deleteDocument(id);
      return await this.insertDocument(entity, id);
    } catch (error) {
      throw new UserError(
        StatusCodes.ES_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchDocuments(body: ElasticSearchDto) {
    try {
      const data = {
        index: this.entityIndex.index,
        ...body,
      };
      const res = await this.esService.search(data);

      return res;
    } catch (error) {
      return [];
      // throw new UserError(
      //   StatusCodes.FAILURE,
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }

  async deleteIndex(indexData: any) {
    const data = await this.esService.indices.delete(indexData);

    if (!data)
      throw new UserError(
        StatusCodes.FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return data;
  }

  async deleteDocument(id: number) {
    try {
      const data = {
        index: this.entityIndex.index,
        type: this.entityIndex.type,
        id: id.toString(),
      };
      return await this.esService.delete(data);
    } catch (error) {
      throw new UserError(
        StatusCodes.ES_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private bulkIndex(id: number) {
    return {
      _index: this.entityIndex.index,
      _type: this.entityIndex.type,
      _id: id,
    };
  }

  private entityDocument(entity: T, id: number) {
    const bulk = [];
    bulk.push({
      index: this.bulkIndex(id),
    });
    bulk.push(entity);

    return {
      body: bulk,
      index: this.entityIndex.index,
      type: this.entityIndex.type,
    };
  }
}
