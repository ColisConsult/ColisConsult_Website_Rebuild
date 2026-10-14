import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

/*
 * Pas de valeurs par défaut dans les DTO : ce sont les valeurs par défaut de la
 * base qui s'appliquent à la création, et un PATCH partiel ne touche que les
 * champs envoyés.
 */
const emptyToNull = ({ value }: { value: unknown }) =>
  typeof value === 'string' && value.trim() === '' ? null : value;

export class CreatePostDto {
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Le slug ne doit contenir que des minuscules, chiffres et tirets',
  })
  @MaxLength(200)
  slug!: string;

  @IsOptional() @IsIn(['fr', 'en']) locale?: 'fr' | 'en';
  @IsString() @MinLength(3) @MaxLength(250) title!: string;
  @IsOptional() @IsString() @MaxLength(600) excerpt?: string;
  @IsOptional() @IsString() @MaxLength(200_000) content?: string;
  @IsOptional() @Transform(emptyToNull) @IsString() @MaxLength(500) coverImageUrl?: string | null;
  @IsOptional() @IsIn(['draft', 'published']) status?: 'draft' | 'published';
  /** article : conseils, analyses · news : actualités, annonces de webinars */
  @IsOptional() @IsIn(['article', 'news']) kind?: 'article' | 'news';
  @IsOptional() @Transform(emptyToNull) @Type(() => Date) @IsDate() publishedAt?: Date | null;
}
export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class CreateTestimonialDto {
  @IsString() @MinLength(1) @MaxLength(200) company!: string;
  @IsString() @MinLength(1) @MaxLength(200) author!: string;
  @IsOptional() @IsString() @MaxLength(300) role?: string;
  @IsString() @MinLength(5) @MaxLength(3000) quoteFr!: string;
  @IsOptional() @Transform(emptyToNull) @IsString() @MaxLength(3000) quoteEn?: string | null;
  @IsOptional() @IsIn(['fr', 'en']) quoteLang?: 'fr' | 'en';
  @IsOptional() @IsString() @MaxLength(300) missionFr?: string;
  @IsOptional() @Transform(emptyToNull) @IsString() @MaxLength(300) missionEn?: string | null;
  @IsOptional() @Transform(emptyToNull) @IsString() @MaxLength(200) resultFr?: string | null;
  @IsOptional() @Transform(emptyToNull) @IsString() @MaxLength(200) resultEn?: string | null;
  @IsOptional() @IsIn(['enterprise', 'ecommerce', 'sme']) segment?: 'enterprise' | 'ecommerce' | 'sme';
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}
export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}

export class CreateWebinarDto {
  @IsString() @MinLength(3) @MaxLength(250) titleFr!: string;
  @IsOptional() @Transform(emptyToNull) @IsString() @MaxLength(250) titleEn?: string | null;
  @IsOptional() @IsString() @MaxLength(3000) descriptionFr?: string;
  @IsOptional() @Transform(emptyToNull) @IsString() @MaxLength(3000) descriptionEn?: string | null;
  @Type(() => Date) @IsDate() startsAt!: Date;
  @IsOptional() @Type(() => Number) @IsInt() @Min(5) durationMinutes?: number;
  @IsOptional() @Transform(emptyToNull) @IsUrl({ require_protocol: true }) registrationUrl?: string | null;
  @IsOptional() @Transform(emptyToNull) @IsUrl({ require_protocol: true }) replayUrl?: string | null;
  @IsOptional() @IsBoolean() published?: boolean;
}
export class UpdateWebinarDto extends PartialType(CreateWebinarDto) {}
