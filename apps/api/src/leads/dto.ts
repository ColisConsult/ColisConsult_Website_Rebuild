import { Transform, Type } from 'class-transformer';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const toBool = ({ value }: { value: unknown }) => value === true || value === 'true' || value === 'on';

export class BaseLeadDto {
  @Transform(trim) @IsString() @MinLength(1) @MaxLength(100) firstName!: string;
  @Transform(trim) @IsString() @MinLength(1) @MaxLength(100) lastName!: string;
  @Transform(trim) @IsString() @MinLength(1) @MaxLength(200) company!: string;
  @Transform(trim) @IsEmail({}, { message: 'Adresse e-mail invalide' }) @MaxLength(200) email!: string;
  @IsOptional() @Transform(trim) @IsString() @MaxLength(40) phone?: string;
  @IsOptional() @Transform(trim) @IsString() @MaxLength(150) jobTitle?: string;
  @IsOptional() @IsIn(['fr', 'en']) locale?: 'fr' | 'en';

  /** Consentement RGPD obligatoire */
  @Transform(toBool) @IsBoolean() @Equals(true, { message: 'Le consentement est requis' })
  consent!: boolean;

  /** Pot de miel anti-spam : doit rester vide */
  @IsOptional() @IsString() @MaxLength(200) website?: string;
}

export class ContactLeadDto extends BaseLeadDto {
  @Transform(trim) @IsString() @MinLength(5) @MaxLength(5000) message!: string;
}

export class PreAuditLeadDto extends BaseLeadDto {
  @IsOptional() @IsIn(['<150k', '150k-500k', '500k-2m', '2m-10m', '>10m']) annualBudget?: string;
  @IsOptional() @Transform(trim) @IsString() @MaxLength(500) carriers?: string;
  @IsOptional() @Transform(trim) @IsString() @MaxLength(5000) message?: string;
}

export class SimulatorLeadDto extends BaseLeadDto {
  @IsObject() @Type(() => Object) simulation!: Record<string, unknown>;
}

export class UpdateLeadDto {
  @IsOptional() @IsIn(['new', 'in_progress', 'done', 'archived'])
  status?: 'new' | 'in_progress' | 'done' | 'archived';

  @IsOptional() @IsString() @MaxLength(10_000) notes?: string;
}
