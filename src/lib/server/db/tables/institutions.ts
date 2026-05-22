import { pgTable, serial, integer, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';

export const institutions = pgTable('institutions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  shortName: text('short_name'),
  type: text('type').notNull(),
  city: text('city'),
  province: text('province'),
  country: text('country').default('Indonesia'),
  website: text('website'),
  logoUrl: text('logo_url'),
  isVerified: boolean('is_verified').default(false),
  createdBy:  text('created_by').notNull().references(() => user.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const institutionsRelations = relations(institutions, ({ one }) => ({
  creator: one(user, { fields: [institutions.createdBy], references: [user.id] })
}));
