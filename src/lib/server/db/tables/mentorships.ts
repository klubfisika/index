import { pgTable, serial, integer, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';

export const mentorships = pgTable('mentorships', {
  id: serial('id').primaryKey(),
  mentorId:  text('mentor_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  menteeId:  text('mentee_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  status: text('status').notNull().default('pending'),
  focusArea: text('focus_area'),
  notes: text('notes'),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
  createdAt: timestamp('created_at').defaultNow()
}, (t) => ({
  uniqueMentorship: unique().on(t.mentorId, t.menteeId)
}));

export const mentorshipsRelations = relations(mentorships, ({ one }) => ({
  mentor: one(user, { fields: [mentorships.mentorId], references: [user.id], relationName: 'mentorRelations' }),
  mentee: one(user, { fields: [mentorships.menteeId], references: [user.id], relationName: 'menteeRelations' })
}));
