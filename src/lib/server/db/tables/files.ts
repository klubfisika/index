import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { researchWorks } from './research_works';

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  uploadedBy:  text('uploaded_by').notNull().references(() => user.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  storageKey: text('storage_key').notNull().unique(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  fileType: text('file_type').default('document'),
  status: text('status').default('uploaded'),
  createdAt: timestamp('created_at').defaultNow()
});

export const filesRelations = relations(files, ({ one }) => ({
  work: one(researchWorks, { fields: [files.workId], references: [researchWorks.id] }),
  uploader: one(user, { fields: [files.uploadedBy], references: [user.id] })
}));
