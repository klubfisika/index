import { redirect, fail } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { researchWorks, authors } from '$lib/server/db/schema';
import { tags, workTags } from '$lib/server/db/tables/tags';
import { eq } from 'drizzle-orm';

export async function load(event: RequestEvent) {
	const user = event.locals.user;

	if (!user) {
		throw redirect(303, '/auth/sign-in');
	}

	return {
		user: {
			name: user.name,
			email: user.email
		}
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		const user = event.locals.user;
		if (!user) return fail(401, { error: 'Harus login terlebih dahulu' });

		const formData = await event.request.formData();
		const title = formData.get('title')?.toString().trim();
		const abstract = formData.get('abstract')?.toString().trim();
		const type = formData.get('type')?.toString() || 'paper';
		const field = formData.get('field')?.toString().trim();
		const keywordsInput = formData.get('keywords')?.toString().trim();
		const educationLevel = formData.get('education_level')?.toString() || 'SMA';
		const language = formData.get('language')?.toString() || 'id';
		const researchDateStr = formData.get('research_date')?.toString() || null;

		if (!title || !abstract) {
			return fail(400, { error: 'Judul dan abstrak wajib diisi' });
		}

		if (title.length < 10) {
			return fail(400, { error: 'Judul minimal 10 karakter' });
		}

		if (abstract.length < 50) {
			return fail(400, { error: 'Abstrak minimal 50 karakter' });
		}

		const [work] = await db.insert(researchWorks).values({
			title,
			abstract,
			type,
			field: field || undefined,
			keywords: keywordsInput || undefined,
			educationLevel,
			language,
			researchDate: researchDateStr,
			ownerId: user.id,
			status: 'submitted'
		}).returning({ id: researchWorks.id });

		await db.insert(authors).values({
			workId: work.id,
			userId: user.id,
			role: 'author',
			position: 1
		});

		if (keywordsInput) {
			const keywordList = keywordsInput.split(',').map((k) => k.trim()).filter(Boolean);
			for (const kw of keywordList) {
				const slug = kw.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
				const existing = await db.select({ id: tags.id }).from(tags).where(eq(tags.slug, slug));

				if (existing.length > 0) {
					const tagId = existing[0].id;
					await db.insert(workTags).values({ workId: work.id, tagId });
				} else {
					const [newTag] = await db.insert(tags).values({ name: kw, slug, usageCount: 1 }).returning({ id: tags.id });
					await db.insert(workTags).values({ workId: work.id, tagId: newTag.id });
				}
			}
		}

		return { success: true, workId: work.id };
	}
};
