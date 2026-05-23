<script lang="ts">
	let { data } = $props();

	let typeLabels: Record<string, string> = $derived({
		paper: 'Paper', report: 'Laporan', poster: 'Poster',
		experiment: 'Eksperimen', project: 'Proyek', tutorial: 'Tutorial'
	});

	let levelLabels: Record<string, string> = $derived({
		SD: 'SD', SMP: 'SMP', SMA: 'SMA', SMK: 'SMK',
		D3: 'D3', S1: 'S1', S2: 'S2', S3: 'S3'
	});
</script>

<div class="min-h-screen bg-slate-50">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
		<div class="mb-6">
			<a href="/" class="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
				Kembali
			</a>
		</div>

		<div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
			<div class="flex flex-col sm:flex-row items-start gap-5">
				<div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl sm:text-3xl font-bold shrink-0">
					{data.profile.userName?.charAt(0) || '?'}
				</div>
				<div class="flex-1 min-w-0">
					<h1 class="text-xl sm:text-2xl font-bold text-slate-900">{data.profile.userName}</h1>
					<p class="text-sm text-slate-500 mt-0.5">@{data.profile.username}</p>
					{#if data.profile.institutionName}
						<p class="text-sm text-slate-600 mt-1.5 flex items-center gap-1.5">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/></svg>
							{data.profile.institutionName}
						</p>
					{/if}
					<div class="flex flex-wrap gap-2 mt-3">
						<span class="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
							{levelLabels[data.profile.level ?? ''] || data.profile.level || 'SMA'}
						</span>
						{#if data.profile.major}
							<span class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">{data.profile.major}</span>
						{/if}
					</div>
					{#if data.profile.bio}
						<p class="text-sm text-slate-600 mt-4 leading-relaxed">{data.profile.bio}</p>
					{/if}
				</div>
			</div>

			<div class="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
				<div class="text-center">
					<span class="block text-xl sm:text-2xl font-bold text-slate-900">{data.profile.worksCount}</span>
					<span class="text-xs text-slate-400">Karya</span>
				</div>
				<div class="text-center">
					<span class="block text-xl sm:text-2xl font-bold text-slate-900">{data.profile.citationsCount}</span>
					<span class="text-xs text-slate-400">Sitasi</span>
				</div>
				<div class="text-center">
					<span class="block text-xl sm:text-2xl font-bold text-amber-500">{data.profile.cendolCount}</span>
					<span class="text-xs text-slate-400">Cendol</span>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
			<h2 class="text-lg font-bold text-slate-900 mb-4">Karya Ilmiah</h2>
			{#if data.works.length === 0}
				<p class="text-sm text-slate-400 py-8 text-center">Belum ada karya yang dipublikasikan.</p>
			{:else}
				<div class="divide-y divide-slate-100">
					{#each data.works as work}
						<a href="/karya/{work.id}" class="block py-4 hover:bg-slate-50 -mx-3 px-3 rounded-lg transition-colors">
							<div class="flex items-start justify-between gap-3">
								<div class="min-w-0">
									<h3 class="text-sm font-semibold text-slate-900 line-clamp-2">{work.title}</h3>
									<div class="flex items-center gap-2 mt-1.5">
										<span class="text-xs text-slate-400">{typeLabels[work.type] || work.type}</span>
										{#if work.field}
											<span class="text-xs text-slate-400">· {work.field}</span>
										{/if}
										<span class="text-xs text-slate-400">· {work.createdAt ? new Date(work.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : ''}</span>
									</div>
								</div>
								<div class="flex items-center gap-2 shrink-0">
									{#if work.citationCount > 0}
										<span class="text-xs text-slate-400">{work.citationCount} sitasi</span>
									{/if}
									<svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
