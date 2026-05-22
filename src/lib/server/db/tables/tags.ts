import { pgTable, serial, integer, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { researchWorks } from './research_works';

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  usageCount: integer('usage_count').default(0),
  createdAt: timestamp('created_at').defaultNow()
});

export const tagsRelations = relations(tags, ({ many }) => ({
  works: many(workTags)
}));

export const workTags = pgTable('work_tags', {
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' })
}, (t) => ({
  pk: primaryKey({ columns: [t.workId, t.tagId] })
}));

export const workTagsRelations = relations(workTags, ({ one }) => ({
  work: one(researchWorks, { fields: [workTags.workId], references: [researchWorks.id] }),
  tag: one(tags, { fields: [workTags.tagId], references: [tags.id] })
}));
