<script lang="ts">
	let { data, form } = $props();

	let title = $state('');
	let abstract = $state('');
	let type = $state('paper');
	let field = $state('');
	let keywords = $state('');
	let educationLevel = $state('SMA');
	let language = $state('id');
	let researchDate = $state('');

	let submitting = $state(false);
	let submitted = $state(false);
	let errorMessage = $state('');

	let typeOptions = $derived([
		{ value: 'paper', label: 'Paper / Makalah' },
		{ value: 'report', label: 'Laporan Riset' },
		{ value: 'poster', label: 'Poster Ilmiah' },
		{ value: 'experiment', label: 'Eksperimen' },
		{ value: 'project', label: 'Proyek' },
		{ value: 'tutorial', label: 'Tutorial' }
	]);

	let levelOptions = $derived([
		{ value: 'SD', label: 'SD' },
		{ value: 'SMP', label: 'SMP' },
		{ value: 'SMA', label: 'SMA' },
		{ value: 'SMK', label: 'SMK' },
		{ value: 'D3', label: 'D3' },
		{ value: 'S1', label: 'S1' },
		{ value: 'S2', label: 'S2' },
		{ value: 'S3', label: 'S3' }
	]);

	let fieldOptions = $derived([
		{ value: 'fisika', label: 'Fisika' },
		{ value: 'biologi', label: 'Biologi' },
		{ value: 'kimia', label: 'Kimia' },
		{ value: 'matematika', label: 'Matematika' },
		{ value: 'komputer', label: 'Komputer & Informatika' },
		{ value: 'teknik', label: 'Teknik' },
		{ value: 'astronomi', label: 'Astronomi' },
		{ value: 'lingkungan', label: 'Lingkungan' },
		{ value: 'sosial', label: 'Sosial & Humaniora' },
		{ value: 'lainnya', label: 'Lainnya' }
	]);

	$effect(() => {
		if (form?.success) {
			submitted = true;
		}
		if (form?.error) {
			errorMessage = form.error;
		}
	});

	function handleSubmit(e: SubmitEvent) {
		submitting = true;
		errorMessage = '';
	}
</script>

<div class="min-h-screen bg-slate-50 py-10 sm:py-16">
	<div class="max-w-2xl mx-auto px-4 sm:px-6">
		<div class="mb-8">
			<a href="/" class="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
				Kembali
			</a>
		</div>

		{#if submitted}
			<div class="bg-white rounded-2xl border border-green-200 p-8 sm:p-10 text-center shadow-sm">
				<div class="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-4">
					<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
				</div>
				<h2 class="text-xl font-bold text-slate-900 mb-2">Karya berhasil diunggah!</h2>
				<p class="text-sm text-slate-500 mb-6">
					Karya Anda telah masuk ke sistem dan menunggu verifikasi. Anda akan diberitahu saat status berubah.
				</p>
				<div class="flex justify-center gap-3">
					<a href={`/karya/${form?.workId}`} class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
						Lihat karya
						<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
					</a>
					<a href="/upload" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
						Unggah lagi
					</a>
				</div>
			</div>
		{:else}
			<div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
				<h1 class="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Unggah Karya Ilmiah</h1>
				<p class="text-sm text-slate-500 mb-6">Isi metadata karya Anda dengan lengkap. Semua karya akan diverifikasi sebelum dipublikasikan.</p>

				<form method="POST" onsubmit={handleSubmit} class="space-y-5">
					<div>
						<label for="title" class="block text-sm font-semibold text-slate-700 mb-1.5">Judul Karya <span class="text-red-500">*</span></label>
						<input
							type="text"
							id="title"
							name="title"
							required
							minlength="10"
							bind:value={title}
							placeholder="Contoh: Pengaruh Media Tanam terhadap Pertumbuhan Tanaman Cabai"
							class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
						/>
					</div>

					<div>
						<label for="abstract" class="block text-sm font-semibold text-slate-700 mb-1.5">Abstrak <span class="text-red-500">*</span></label>
						<textarea
							id="abstract"
							name="abstract"
							required
							minlength="50"
							rows={6}
							bind:value={abstract}
							placeholder="Tulis abstrak karya Anda (minimal 50 karakter). Jelaskan: apa yang diteliti, bagaimana metodenya, dan apa temuannya."
							class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-y"
						></textarea>
						<p class="text-xs text-slate-400 mt-1">{abstract.length}/50 karakter minimum</p>
					</div>

					<div class="grid sm:grid-cols-2 gap-4">
						<div>
							<label for="type" class="block text-sm font-semibold text-slate-700 mb-1.5">Tipe Karya</label>
							<select id="type" name="type" bind:value={type} class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
								{#each typeOptions as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						</div>

						<div>
							<label for="education_level" class="block text-sm font-semibold text-slate-700 mb-1.5">Jenjang Pendidikan</label>
							<select id="education_level" name="education_level" bind:value={educationLevel} class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
								{#each levelOptions as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="grid sm:grid-cols-2 gap-4">
						<div>
							<label for="field" class="block text-sm font-semibold text-slate-700 mb-1.5">Bidang Ilmu</label>
							<select id="field" name="field" bind:value={field} class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
								<option value="">Pilih bidang...</option>
								{#each fieldOptions as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						</div>

						<div>
							<label for="research_date" class="block text-sm font-semibold text-slate-700 mb-1.5">Tanggal Riset</label>
							<input type="date" id="research_date" name="research_date" bind:value={researchDate} class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
						</div>
					</div>

					<div>
						<label for="keywords" class="block text-sm font-semibold text-slate-700 mb-1.5">Kata Kunci</label>
						<input
							type="text"
							id="keywords"
							name="keywords"
							bind:value={keywords}
							placeholder="Contoh: cabai, media tanam, pertumbuhan, organik"
							class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
						/>
						<p class="text-xs text-slate-400 mt-1">Pisahkan dengan koma. Contoh: fotosintesis, cahaya, tanaman</p>
					</div>

					<div>
						<label for="language" class="block text-sm font-semibold text-slate-700 mb-1.5">Bahasa</label>
						<select id="language" name="language" bind:value={language} class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
							<option value="id">Bahasa Indonesia</option>
							<option value="en">English</option>
						</select>
					</div>

					{#if errorMessage}
						<div class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
							{errorMessage}
						</div>
					{/if}

					<button
						type="submit"
						disabled={submitting || title.length < 10 || abstract.length < 50}
						class="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10"
					>
						{submitting ? 'Mengunggah...' : 'Unggah Karya'}
					</button>
				</form>
			</div>
		{/if}
	</div>
</div>
