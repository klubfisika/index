import { pgTable, serial, integer, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { researchWorks } from './research_works';

export const verifications = pgTable('verifications', {
  id: serial('id').primaryKey(),
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  verifierId:  text('verifier_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  verifierRole: text('verifier_role').notNull(),
  level: integer('level').notNull().default(1),
  status: text('status').notNull().default('pending'),
  notes: text('notes'),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at').defaultNow()
}, (t) => ({
  uniqueVerification: unique().on(t.workId, t.verifierId, t.level)
}));

export const verificationsRelations = relations(verifications, ({ one }) => ({
  work: one(researchWorks, { fields: [verifications.workId], references: [researchWorks.id] }),
  verifier: one(user, { fields: [verifications.verifierId], references: [user.id] })
}));
