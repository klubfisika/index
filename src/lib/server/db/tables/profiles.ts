import { pgTable, serial, integer, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../auth.schema';
import { institutions } from './institutions';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId:  text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  username: text('username').unique(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  institutionId: integer('institution_id').references(() => institutions.id),
  level: text('level').default('SMA'),
  major: text('major'),
  year: text('year'),
  phone: text('phone'),
  website: text('website'),
  language: text('language').default('id'),
  visibility: text('visibility').default('public'),
  worksCount: integer('works_count').default(0),
  citationsCount: integer('citations_count').default(0),
  cendolCount: integer('cendol_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(user, { fields: [profiles.userId], references: [user.id] }),
  institution: one(institutions, { fields: [profiles.institutionId], references: [institutions.id] })
}));
