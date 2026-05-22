import { pgTable, serial, integer, text, boolean, date, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { authors } from './authors';
import { workCategories } from './categories';
import { workTags } from './tags';
import { verifications } from './verifications';
import { citations, citationsSourceRelation, citationsTargetRelation } from './citations';
import { reviews } from './reviews';
import { files } from './files';
import { workLikes } from './work_likes';
import { workCompetitions } from './competitions';

export const researchWorks = pgTable('research_works', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  abstract: text('abstract').notNull(),
  contentText: text('content_text'),
  type: text('type').notNull().default('paper'),
  language: text('language').default('id'),
  status: text('status').notNull().default('draft'),
  visibility: text('visibility').default('public'),
  field: text('field'),
  subfield: text('subfield'),
  keywords: text('keywords'),
  doi: text('doi').unique(),
  educationLevel: text('education_level').default('SMA'),
  fileUrl: text('file_url'),
  fileSize: integer('file_size'),
  fileType: text('file_type'),
  thumbnailUrl: text('thumbnail_url'),
  viewCount: integer('view_count').default(0),
  citationCount: integer('citation_count').default(0),
  likeCount: integer('like_count').default(0),
  researchDate: date('research_date'),
  publishedAt: timestamp('published_at'),
  ownerId:  text('owner_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const researchWorksRelations = relations(researchWorks, ({ one, many }) => ({
  owner: one(user, { fields: [researchWorks.ownerId], references: [user.id] }),
  authors: many(authors),
  categories: many(workCategories),
  tags: many(workTags),
  verifications: many(verifications),
  sourceCitations: many(citations, citationsSourceRelation),
  targetCitations: many(citations, citationsTargetRelation),
  reviews: many(reviews),
  files: many(files),
  likes: many(workLikes),
  competitions: many(workCompetitions)
}));
