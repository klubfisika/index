import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { researchWorks, authors } from '$lib/server/db/schema';
import { tags, workTags } from '$lib/server/db/tables/tags';
import { user } from '$lib/server/db/auth.schema';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const workId = parseInt(event.params.id ?? '');
	if (isNaN(workId)) throw error(404, 'Karya tidak ditemukan');

	const [work] = await db.select().from(researchWorks).where(eq(researchWorks.id, workId));
	if (!work) throw error(404, 'Karya tidak ditemukan');

	const workAuthors = await db
		.select({ name: user.name, role: authors.role, position: authors.position })
		.from(authors)
		.innerJoin(user, eq(authors.userId, user.id))
		.where(eq(authors.workId, workId))
		.orderBy(authors.position);

	const workTagList = await db
		.select({ name: tags.name, slug: tags.slug })
		.from(workTags)
		.innerJoin(tags, eq(workTags.tagId, tags.id))
		.where(eq(workTags.workId, workId));

	const [owner] = await db.select({ name: user.name }).from(user).where(eq(user.id, work.ownerId));

	return {
		work: {
			id: work.id,
			title: work.title,
			abstract: work.abstract,
			type: work.type,
			field: work.field,
			keywords: work.keywords,
			educationLevel: work.educationLevel,
			language: work.language,
			status: work.status,
			researchDate: work.researchDate,
			createdAt: work.createdAt
		},
		authors: workAuthors,
		tags: workTagList,
		owner: owner ? { name: owner.name } : null
	};
}
