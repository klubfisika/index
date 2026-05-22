import { db } from '$lib/server/db';
import { researchWorks } from '$lib/server/db/tables/research_works';
import { profiles } from '$lib/server/db/tables/profiles';
import { institutions } from '$lib/server/db/tables/institutions';
import { sql } from 'drizzle-orm';

export async function load(event: { locals: { user: unknown; session: unknown } }) {
	const user = event.locals.user as Record<string, unknown> | undefined;
	const session = event.locals.session as Record<string, unknown> | undefined;

	const [worksCount, profilesCount, institutionsCount] = await Promise.all([
		db.select({ count: sql<number>`count(*)` }).from(researchWorks),
		db.select({ count: sql<number>`count(*)` }).from(profiles),
		db.select({ count: sql<number>`count(*)` }).from(institutions)
	]);

	return {
		user: user ? { name: user.name as string, email: user.email as string, image: user.image as string | undefined } : null,
		session: session ? { expiresAt: session.expiresAt as string } : null,
		stats: {
			works: worksCount[0]?.count ?? 0,
			researchers: profilesCount[0]?.count ?? 0,
			institutions: institutionsCount[0]?.count ?? 0
		}
	};
}
