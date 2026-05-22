import { pgTable, serial, integer, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { researchWorks } from './research_works';

export const citations = pgTable('citations', {
  id: serial('id').primaryKey(),
  sourceWorkId: integer('source_work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  targetWorkId: integer('target_work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  context: text('context'),
  pageNumber: integer('page_number'),
  createdBy:  text('created_by').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow()
}, (t) => ({
  uniqueCitation: unique().on(t.sourceWorkId, t.targetWorkId)
}));

export const citationsRelations = relations(citations, ({ one }) => ({
  sourceWork: one(researchWorks, { fields: [citations.sourceWorkId], references: [researchWorks.id], relationName: 'sourceCitations' }),
  targetWork: one(researchWorks, { fields: [citations.targetWorkId], references: [researchWorks.id], relationName: 'targetCitations' }),
  creator: one(user, { fields: [citations.createdBy], references: [user.id] })
}));

export const citationsSourceRelation = { relationName: 'sourceCitations' } as const;
export const citationsTargetRelation = { relationName: 'targetCitations' } as const;
