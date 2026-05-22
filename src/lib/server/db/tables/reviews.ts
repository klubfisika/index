import { pgTable, serial, integer, text, boolean, timestamp, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { researchWorks } from './research_works';

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  reviewerId:  text('reviewer_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  rating: integer('rating'),
  content: text('content').notNull(),
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
}, (t) => ({
  ratingCheck: check('rating_check', sql`rating >= 1 AND rating <= 5`)
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  work: one(researchWorks, { fields: [reviews.workId], references: [researchWorks.id] }),
  reviewer: one(user, { fields: [reviews.reviewerId], references: [user.id] })
}));
