import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/auth.schema';
import { profiles, institutions } from '$lib/server/db/schema';
import { researchWorks, authors } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const username = event.params.username ?? '';

	const [profile] = await db
		.select({
			id: profiles.id,
			userId: profiles.userId,
			username: profiles.username,
			bio: profiles.bio,
			avatarUrl: profiles.avatarUrl,
			level: profiles.level,
			major: profiles.major,
			institutionName: institutions.name,
			worksCount: profiles.worksCount,
			citationsCount: profiles.citationsCount,
			cendolCount: profiles.cendolCount,
			userName: user.name,
			userImage: user.image
		})
		.from(profiles)
		.innerJoin(user, eq(profiles.userId, user.id))
		.leftJoin(institutions, eq(profiles.institutionId, institutions.id))
		.where(eq(profiles.username, username));

	if (!profile) throw error(404, 'Peneliti tidak ditemukan');

	const works = await db
		.select({
			id: researchWorks.id,
			title: researchWorks.title,
			type: researchWorks.type,
			status: researchWorks.status,
			field: researchWorks.field,
			citationCount: researchWorks.citationCount,
			createdAt: researchWorks.createdAt,
			publishedAt: researchWorks.publishedAt
		})
		.from(authors)
		.innerJoin(researchWorks, eq(authors.workId, researchWorks.id))
		.where(and(eq(authors.userId, profile.userId), eq(researchWorks.visibility, 'public')))
		.orderBy(desc(researchWorks.createdAt))
		.limit(20);

	return { profile, works };
}
