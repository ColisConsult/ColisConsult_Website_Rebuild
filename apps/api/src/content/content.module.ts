import { Module } from '@nestjs/common';
import { AdminContentController } from './admin.controller.js';
import { CatalogService } from './catalog.service.js';
import { PostsService } from './posts.service.js';
import { PublicContentController } from './public.controller.js';

@Module({
  controllers: [PublicContentController, AdminContentController],
  providers: [PostsService, CatalogService],
})
export class ContentModule {}
