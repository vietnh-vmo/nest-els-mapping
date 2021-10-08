import { BaseStatus } from '@modules/base/base.interface';
import { ElasticSearchDto } from '@modules/search/dto/es-body.dto';
import { ListProductsDto } from './dto/list-products.dto';

export const getEsSearchQuery = (query: ListProductsDto) => {
  const page = Number(query.page) || 1;
  const size = Number(query.limit) || 20;
  const from = (Number(page) - 1) * Number(size);

  const body: any = {
    body: {
      size,
      from,
      query: {
        bool: {
          must: [
            {
              match: {
                status: BaseStatus.ACTIVE,
              },
            },
          ],
        },
      },
      sort: [],
    } as ElasticSearchDto,
  };

  if (query.search) {
    body.body.query.bool.must.push({
      match: {
        url: query.search,
      },
    });

    body.q = query.search;
  }

  if (query.fIsNew) {
    body.body.query.bool.must.push({
      match: {
        isNew: query.fIsNew,
      },
    });
  }

  if (query.fPriceRangeMin && query.fPriceRangeMax) {
    body.body.query.bool.must.push({
      range: {
        price: {
          gte: query.fPriceRangeMin,
          lte: query.fPriceRangeMax,
        },
      },
    });
  }

  if (query.fGender) {
    body.body.query.bool.must.push({
      match: {
        gender: query.fGender,
      },
    });
  }

  if (query.fCondition) {
    body.body.query.bool.must.push({
      match: {
        condition: query.fCondition,
      },
    });
  }

  if (query.sortPrice) {
    body.body.sort = [...body.body.sort, { price: query.sortPrice }];
  }

  if (query.sortCreatedAt) {
    body.body.sort = [...body.body.sort, { createdAt: query.sortCreatedAt }];
  }

  return body;
};
