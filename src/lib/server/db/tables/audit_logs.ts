import { pgTable, serial, integer, text, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId:  text('user_id').notNull().references(() => user.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: integer('entity_id'),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow()
});

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(user, { fields: [auditLogs.userId], references: [user.id] })
}));
