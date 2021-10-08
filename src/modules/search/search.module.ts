import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { envConfig } from '@helper/env.helpers';
import { SearchService } from './search.service';
import { Module, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: envConfig.ES_URL,
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
      }),
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly es: ElasticsearchService) {}
  onModuleInit() {
    this.es.ping();
  }
}
