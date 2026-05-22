import { pgTable, serial, integer, text, boolean, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { researchWorks } from './research_works';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  parentId: integer('parent_id').references((): any => categories.id),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow()
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, { fields: [categories.parentId], references: [categories.id] }),
  children: many(categories),
  works: many(workCategories)
}));

export const workCategories = pgTable('work_categories', {
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  isPrimary: boolean('is_primary').default(false)
}, (t) => ({
  pk: primaryKey({ columns: [t.workId, t.categoryId] })
}));

export const workCategoriesRelations = relations(workCategories, ({ one }) => ({
  work: one(researchWorks, { fields: [workCategories.workId], references: [researchWorks.id] }),
  category: one(categories, { fields: [workCategories.categoryId], references: [categories.id] })
}));
