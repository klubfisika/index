<script lang="ts">
	let { data } = $props();

	let typeLabels: Record<string, string> = $derived({
		paper: 'Paper', report: 'Laporan', poster: 'Poster',
		experiment: 'Eksperimen', project: 'Proyek', tutorial: 'Tutorial'
	});
</script>

<div class="min-h-screen bg-slate-50 py-10 sm:py-16">
	<div class="max-w-4xl mx-auto px-4 sm:px-6">
		<div class="mb-6 flex items-center justify-between">
			<div>
				<a href="/" class="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
					Beranda
				</a>
				<h1 class="text-2xl sm:text-3xl font-bold text-slate-900 mt-4">Jelajahi Karya</h1>
				<p class="text-sm text-slate-500 mt-1">{data.works.length} karya terindeks</p>
			</div>
			<a href="/upload" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
				Unggah
			</a>
		</div>

		{#if data.works.length === 0}
			<div class="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
				<div class="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
					<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
				</div>
				<h2 class="text-lg font-bold text-slate-900 mb-2">Belum ada karya</h2>
				<p class="text-sm text-slate-500 mb-6">Jadilah yang pertama mengunggah karya ilmiah.</p>
				<a href="/upload" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
					Unggah karya
				</a>
			</div>
		{:else}
			<div class="space-y-4">
				{#each data.works as work}
					<a href="/karya/{work.id}" class="block bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-blue-200 hover:shadow-md transition-all duration-200 shadow-sm">
						<div class="flex items-start justify-between gap-4">
							<div class="min-w-0 flex-1">
								<div class="flex items-center gap-2 mb-1.5">
									<span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">{typeLabels[work.type] || work.type}</span>
									{#if work.field}
										<span class="text-[10px] text-slate-400">{work.field}</span>
									{/if}
								</div>
								<h3 class="text-base font-semibold text-slate-900 line-clamp-2">{work.title}</h3>
								{#if work.authors.length > 0}
									<p class="text-xs text-slate-400 mt-1.5">{work.authors.join(', ')}</p>
								{/if}
								<p class="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2">{work.abstract}</p>
							</div>
							<div class="shrink-0">
								<svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
