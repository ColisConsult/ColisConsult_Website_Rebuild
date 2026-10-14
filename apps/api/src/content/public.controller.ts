import { Controller, Get, Param, ParseIntPipe, DefaultValuePipe, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { PostsService } from './posts.service.js';

const LOCALES = ['fr', 'en'];

/** Contenu public consommé par le site Next.js */
@Controller()
export class PublicContentController {
  constructor(
    private readonly postsService: PostsService,
    private readonly catalog: CatalogService,
  ) {}

  @Get('posts')
  posts(
    @Query('locales') locales = 'fr',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(12), ParseIntPipe) pageSize: number,
    @Query('kind') kind?: string,
  ) {
    const list = locales.split(',').filter((l) => LOCALES.includes(l));
    return this.postsService.listPublished(
      list.length ? list : ['fr'],
      Math.max(1, page),
      Math.min(50, Math.max(1, pageSize)),
      kind === 'article' || kind === 'news' ? kind : undefined,
    );
  }

  @Get('posts/slugs')
  slugs() {
    return this.postsService.slugs();
  }

  @Get('posts/legacy-redirects')
  legacy() {
    return this.postsService.legacyRedirects();
  }

  @Get('posts/:slug')
  post(@Param('slug') slug: string, @Query('locale') locale = 'fr') {
    return this.postsService.findPublished(slug, locale);
  }

  @Get('testimonials')
  testimonials(@Query('featured') featured?: string) {
    return this.catalog.testimonials(featured === 'true');
  }

  @Get('webinars')
  webinars(@Query('scope') scope: 'upcoming' | 'past' | 'all' = 'upcoming') {
    return this.catalog.webinars(['upcoming', 'past', 'all'].includes(scope) ? scope : 'upcoming');
  }

  @Get('clients')
  clients() {
    return this.catalog.clients();
  }

  @Get('team')
  team() {
    return this.catalog.team();
  }
}
