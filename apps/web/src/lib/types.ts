export type Segment = 'enterprise' | 'ecommerce' | 'sme';

export interface PostSummary {
  id: string;
  slug: string;
  locale: 'fr' | 'en';
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  status: 'draft' | 'published';
  /** article : conseils, analyses · news : actualités, annonces de webinars */
  kind: PostKind;
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
}
export type PostKind = 'article' | 'news';
export interface Post extends PostSummary {
  content: string;
}

export interface Testimonial {
  id: string;
  company: string;
  author: string;
  role: string;
  quoteFr: string;
  quoteEn: string | null;
  quoteLang: 'fr' | 'en';
  missionFr: string;
  missionEn: string | null;
  resultFr: string | null;
  resultEn: string | null;
  segment: Segment;
  featured: boolean;
  sortOrder: number;
}

export interface Client {
  id: string;
  name: string;
  segment: Segment;
  logoUrl: string | null;
}

export interface TeamMember {
  id: string;
  name: string;
  roleFr: string;
  roleEn: string;
  bioFr: string;
  bioEn: string;
  linkedinUrl: string | null;
  photoUrl: string | null;
}

export interface Webinar {
  id: string;
  titleFr: string;
  titleEn: string | null;
  descriptionFr: string;
  descriptionEn: string | null;
  startsAt: string;
  durationMinutes: number;
  registrationUrl: string | null;
  replayUrl: string | null;
  published: boolean;
}

export interface Lead {
  id: string;
  type: 'contact' | 'pre_audit' | 'simulator';
  status: 'new' | 'in_progress' | 'done' | 'archived';
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string | null;
  email: string;
  phone: string | null;
  message: string | null;
  annualBudget: string | null;
  carriers: string | null;
  payload: Record<string, unknown> | null;
  locale: 'fr' | 'en';
  consent: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  files?: { id: string; originalName: string; mimeType: string; size: number; createdAt: string }[];
  fileCount?: number;
}
