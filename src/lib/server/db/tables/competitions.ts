import { pgTable, serial, integer, text, date, timestamp, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { researchWorks } from './research_works';

export const competitions = pgTable('competitions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  organizer: text('organizer'),
  level: text('level'),
  category: text('category'),
  year: integer('year'),
  description: text('description'),
  website: text('website'),
  registrationStart: date('registration_start'),
  registrationEnd: date('registration_end'),
  eventStart: date('event_start'),
  eventEnd: date('event_end'),
  createdAt: timestamp('created_at').defaultNow()
});

export const competitionsRelations = relations(competitions, ({ many }) => ({
  works: many(workCompetitions)
}));

export const workCompetitions = pgTable('work_competitions', {
  id: serial('id').primaryKey(),
  workId: integer('work_id').notNull().references(() => researchWorks.id, { onDelete: 'cascade' }),
  competitionId: integer('competition_id').notNull().references(() => competitions.id, { onDelete: 'cascade' }),
  achievement: text('achievement'),
  rank: integer('rank'),
  certificateUrl: text('certificate_url'),
  createdAt: timestamp('created_at').defaultNow()
}, (t) => ({
  uniqueWorkCompetition: unique().on(t.workId, t.competitionId)
}));

export const workCompetitionsRelations = relations(workCompetitions, ({ one }) => ({
  work: one(researchWorks, { fields: [workCompetitions.workId], references: [researchWorks.id] }),
  competition: one(competitions, { fields: [workCompetitions.competitionId], references: [competitions.id] })
}));
