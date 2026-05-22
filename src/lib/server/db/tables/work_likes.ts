import { pgTable, integer, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { researchWorks } from './research_works';

export const workLikes = pgTable('work_likes', {
  userId:  text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  type: text('type').notNull().default('cendol'),
  createdAt: timestamp('created_at').defaultNow()
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.workId] })
}));

export const workLikesRelations = relations(workLikes, ({ one }) => ({
  user: one(user, { fields: [workLikes.userId], references: [user.id] }),
  work: one(researchWorks, { fields: [workLikes.workId], references: [researchWorks.id] })
}));
