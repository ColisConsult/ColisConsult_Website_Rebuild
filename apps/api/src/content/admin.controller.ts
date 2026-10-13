import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AdminGuard } from '../auth/admin.guard.js';
import { CatalogService } from './catalog.service.js';
import {
  CreatePostDto,
  CreateTestimonialDto,
  CreateWebinarDto,
  UpdatePostDto,
  UpdateTestimonialDto,
  UpdateWebinarDto,
} from './dto.js';
import { PostsService } from './posts.service.js';

@SkipThrottle()
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminContentController {
  constructor(
    private readonly postsService: PostsService,
    private readonly catalog: CatalogService,
  ) {}

  // Articles
  @Get('posts') listPosts() { return this.postsService.listAll(); }
  @Get('posts/:id') getPost(@Param('id', ParseUUIDPipe) id: string) { return this.postsService.get(id); }
  @Post('posts') createPost(@Body() dto: CreatePostDto) { return this.postsService.create(dto); }
  @Patch('posts/:id') updatePost(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }
  @Delete('posts/:id') removePost(@Param('id', ParseUUIDPipe) id: string) { return this.postsService.remove(id); }

  // Témoignages
  @Get('testimonials') listTestimonials() { return this.catalog.testimonials(); }
  @Get('testimonials/:id') getTestimonial(@Param('id', ParseUUIDPipe) id: string) { return this.catalog.testimonial(id); }
  @Post('testimonials') createTestimonial(@Body() dto: CreateTestimonialDto) { return this.catalog.createTestimonial(dto); }
  @Patch('testimonials/:id') updateTestimonial(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTestimonialDto) {
    return this.catalog.updateTestimonial(id, dto);
  }
  @Delete('testimonials/:id') removeTestimonial(@Param('id', ParseUUIDPipe) id: string) { return this.catalog.removeTestimonial(id); }

  // Webinars
  @Get('webinars') listWebinars() { return this.catalog.webinars('all', false); }
  @Get('webinars/:id') getWebinar(@Param('id', ParseUUIDPipe) id: string) { return this.catalog.webinar(id); }
  @Post('webinars') createWebinar(@Body() dto: CreateWebinarDto) { return this.catalog.createWebinar(dto); }
  @Patch('webinars/:id') updateWebinar(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateWebinarDto) {
    return this.catalog.updateWebinar(id, dto);
  }
  @Delete('webinars/:id') removeWebinar(@Param('id', ParseUUIDPipe) id: string) { return this.catalog.removeWebinar(id); }
}
