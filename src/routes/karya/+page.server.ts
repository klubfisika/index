import { db } from '$lib/server/db';
import { researchWorks, authors } from '$lib/server/db/schema';
import { user } from '$lib/server/db/auth.schema';
import { eq, desc } from 'drizzle-orm';

export async function load() {
	const works = await db
		.select({
			id: researchWorks.id,
			title: researchWorks.title,
			abstract: researchWorks.abstract,
			type: researchWorks.type,
			field: researchWorks.field,
			status: researchWorks.status,
			educationLevel: researchWorks.educationLevel,
			citationCount: researchWorks.citationCount,
			createdAt: researchWorks.createdAt
		})
		.from(researchWorks)
		.where(eq(researchWorks.visibility, 'public'))
		.orderBy(desc(researchWorks.createdAt))
		.limit(50);

	const worksWithAuthors = await Promise.all(
		works.map(async (work) => {
			const workAuthors = await db
				.select({ name: user.name })
				.from(authors)
				.innerJoin(user, eq(authors.userId, user.id))
				.where(eq(authors.workId, work.id))
				.orderBy(authors.position)
				.limit(3);

			return { ...work, authors: workAuthors.map((a) => a.name) };
		})
	);

	return { works: worksWithAuthors };
}
