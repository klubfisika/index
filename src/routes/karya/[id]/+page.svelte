<script lang="ts">
	let { data } = $props();

	let statusLabels: Record<string, string> = $derived({
		draft: 'Draft',
		submitted: 'Menunggu Verifikasi',
		under_review: 'Dalam Review',
		verified: 'Terverifikasi',
		published: 'Dipublikasikan',
		rejected: 'Ditolak'
	});

	let statusColors: Record<string, string> = $derived({
		draft: 'bg-slate-100 text-slate-600',
		submitted: 'bg-amber-100 text-amber-700',
		under_review: 'bg-blue-100 text-blue-700',
		verified: 'bg-green-100 text-green-700',
		published: 'bg-emerald-100 text-emerald-700',
		rejected: 'bg-red-100 text-red-700'
	});

	let typeLabels: Record<string, string> = $derived({
		paper: 'Paper / Makalah',
		report: 'Laporan Riset',
		poster: 'Poster Ilmiah',
		experiment: 'Eksperimen',
		project: 'Proyek',
		tutorial: 'Tutorial'
	});

	let levelLabels: Record<string, string> = $derived({
		SD: 'SD', SMP: 'SMP', SMA: 'SMA', SMK: 'SMK',
		D3: 'D3', S1: 'S1', S2: 'S2', S3: 'S3'
	});

	let fieldLabels: Record<string, string> = $derived({
		fisika: 'Fisika', biologi: 'Biologi', kimia: 'Kimia',
		matematika: 'Matematika', komputer: 'Komputer & Informatika',
		teknik: 'Teknik', astronomi: 'Astronomi', lingkungan: 'Lingkungan',
		sosial: 'Sosial & Humaniora', lainnya: 'Lainnya'
	});
</script>

<div class="min-h-screen bg-slate-50 py-10 sm:py-16">
	<div class="max-w-4xl mx-auto px-4 sm:px-6">
		<div class="mb-6">
			<a href="/" class="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
				Kembali ke beranda
			</a>
		</div>

		<article class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm">
			<div class="flex flex-wrap items-start justify-between gap-3 mb-6">
				<div class="flex flex-wrap gap-2">
					<span class="px-3 py-1 rounded-lg text-xs font-semibold {statusColors[data.work.status] || 'bg-slate-100 text-slate-600'}">
						{statusLabels[data.work.status] || data.work.status}
					</span>
					<span class="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">
						{typeLabels[data.work.type] || data.work.type}
					</span>
					<span class="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">
						{levelLabels[data.work.educationLevel] || data.work.educationLevel}
					</span>
				</div>
				{#if data.work.researchDate}
					<span class="text-xs text-slate-400">
						Riset: {new Date(data.work.researchDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
					</span>
				{/if}
			</div>

			<h1 class="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
				{data.work.title}
			</h1>

			<div class="flex flex-wrap items-center gap-3 mb-6 text-sm text-slate-500">
				<div class="flex items-center gap-1.5">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
					{#each data.authors as author, i}
						<span>{author.name}{i < data.authors.length - 1 ? ', ' : ''}</span>
					{/each}
				</div>
				{#if data.work.field}
					<div class="flex items-center gap-1.5">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
						{fieldLabels[data.work.field] || data.work.field}
					</div>
				{/if}
			</div>

			{#if data.tags.length > 0}
				<div class="flex flex-wrap gap-1.5 mb-6">
					{#each data.tags as tag}
						<span class="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">#{tag.name}</span>
					{/each}
				</div>
			{/if}

			<div class="border-t border-slate-200 pt-6">
				<h2 class="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Abstrak</h2>
				<div class="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
					{data.work.abstract}
				</div>
			</div>

			<div class="border-t border-slate-200 pt-6 mt-6">
				<h2 class="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Informasi</h2>
				<dl class="grid sm:grid-cols-2 gap-3 text-sm">
					<div>
						<dt class="text-slate-400 text-xs">Bahasa</dt>
						<dd class="text-slate-700 font-medium">{data.work.language === 'id' ? 'Bahasa Indonesia' : 'English'}</dd>
					</div>
					<div>
						<dt class="text-slate-400 text-xs">Diupload</dt>
						<dd class="text-slate-700 font-medium">{new Date(data.work.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
					</div>
					{#if data.owner}
						<div>
							<dt class="text-slate-400 text-xs">Diunggah oleh</dt>
							<dd class="text-slate-700 font-medium">{data.owner.name}</dd>
						</div>
					{/if}
				</dl>
			</div>
		</article>
	</div>
</div>
