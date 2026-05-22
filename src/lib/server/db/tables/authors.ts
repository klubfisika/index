import { pgTable, serial, integer, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { researchWorks } from './research_works';

export const authors = pgTable('authors', {
  id: serial('id').primaryKey(),
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  userId:  text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('author'),
  position: integer('position').notNull().default(1),
  affiliation: text('affiliation'),
  createdAt: timestamp('created_at').defaultNow()
}, (t) => ({
  uniqueWorkUser: unique().on(t.workId, t.userId)
}));

export const authorsRelations = relations(authors, ({ one }) => ({
  work: one(researchWorks, { fields: [authors.workId], references: [researchWorks.id] }),
  user: one(user, { fields: [authors.userId], references: [user.id] })
}));
