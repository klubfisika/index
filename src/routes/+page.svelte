<script lang="ts">
	interface HomeData {
		user: { name: string; email: string; image?: string } | null;
		session: { expiresAt: string } | null;
		stats: {
			works: number;
			researchers: number;
			institutions: number;
		};
	}

	let { data } = $props<{ data: HomeData }>();

	let stats = $derived([
		{ value: data.stats.works.toLocaleString('id-ID'), label: 'Karya Terindeks' },
		{ value: data.stats.researchers.toLocaleString('id-ID'), label: 'Peneliti' },
		{ value: data.stats.institutions.toLocaleString('id-ID'), label: 'Institusi' }
	]);

	let features = [
		{
			title: 'Indeksasi Karya Ilmiah',
			description:
				'Setiap karya — dari laporan eksperimen SD hingga paper SMA — diindeks dengan metadata standar yang kompatibel dengan SINTA, Crossref, dan DataCite.',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		},
		{
			title: 'Verifikasi Bertingkat',
			description:
				'Karya melewati verifikasi berjenjang: self-submit → mentor/guru → peer → institusi. Setiap tingkat menambah bobot kredibilitas.',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			title: 'Portofolio Peneliti',
			description:
				'Setiap peneliti punya profil dengan rekam jejak karya, sitasi, dan kontribusi — portabel untuk daftar kuliah, beasiswa, atau karir.',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		},
		{
			title: 'Sitasi & Referensi',
			description:
				'Setiap karya bisa disitasi oleh peneliti lain. Sitasi machine-readable — bisa dilacak, diverifikasi, dan dianalisis secara otomatis.',
			icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
		}
	];

	const steps = [
		{ step: '01', title: 'Daftar akun', desc: 'Buat akun peneliti — bisa sebagai siswa, guru, atau peneliti independen.' },
		{ step: '02', title: 'Unggah karya', desc: 'Upload laporan, paper, atau poster riset. Isi metadata: judul, abstrak, kata kunci.' },
		{ step: '03', title: 'Verifikasi', desc: 'Karya diverifikasi oleh mentor/guru, lalu peer, lalu institusi — bertingkat.' },
		{ step: '04', title: 'Publikasi & sitasi', desc: 'Karya terindeks secara permanen. Bisa ditemukan, dibaca, dan disitasi.' }
	];
</script>

<div class="min-h-screen bg-gradient-to-b from-white to-slate-50">
	<header class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28 pb-12 sm:pb-20">
		<div class="max-w-3xl">
			<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
				<span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
				Arsip Riset Terbuka K&ndash;12 Indonesia
			</div>

			<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight text-balance">
				SINTA untuk
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">K&ndash;12</span>
			</h1>

			<p class="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl text-pretty">
				Platform arsip dan indeksasi karya ilmiah untuk siswa SD, SMP, dan SMA/SMK. Setiap karya terindeks, terverifikasi, dan bisa disitasi — portofolio riset yang bisa dibawa seumur hidup.
			</p>

			<div class="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
				<a href="/auth/sign-up" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-slate-900/10">
					Mulai sekarang
					<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
				</a>
				<a href="#fitur" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
					Pelajari lebih lanjut
					<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
				</a>
			</div>
		</div>

		<div class="mt-10 sm:mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
			{#each stats as stat}
				<div class="border-l-2 border-blue-200 pl-3 sm:pl-4">
					<span class="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</span>
					<span class="block text-[11px] sm:text-xs text-slate-400 mt-0.5">{stat.label}</span>
				</div>
			{/each}
		</div>
	</header>

	<section id="fitur" class="py-12 sm:py-20 bg-white">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10 sm:mb-14">
				<h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
					Mengapa KF13 Index?
				</h2>
				<p class="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
					Dibangun khusus untuk ekosistem riset K&ndash;12 — bukan adaptasi dari platform akademik dewasa.
				</p>
			</div>

			<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
				{#each features as feature}
					<div class="group p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/30 transition-all duration-300">
						<div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
								<path d={feature.icon} />
							</svg>
						</div>
						<h3 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{feature.title}</h3>
						<p class="text-xs sm:text-sm text-slate-500 leading-relaxed">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-12 sm:py-20 bg-slate-50">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10 sm:mb-14">
				<h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
					Bagaimana memulainya
				</h2>
				<p class="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
					Empat langkah — dari daftar hingga karya Anda terindeks secara permanen.
				</p>
			</div>

			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{#each steps as item}
					<div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
						<span class="text-4xl sm:text-5xl font-black text-slate-100 select-none">{item.step}</span>
						<h3 class="text-base font-bold text-slate-900 mt-1 mb-1.5">{item.title}</h3>
						<p class="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-12 sm:py-20 bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="relative overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-12 text-center">
				<div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(37,99,235,0.12),transparent)]"></div>
				<div class="relative">
					<h2 class="text-2xl sm:text-3xl font-bold text-white leading-tight">
						Siap mengindeks karya Anda?
					</h2>
					<p class="mt-3 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
						Gratis. Terbuka. Untuk semua jenjang — SD, SMP, SMA/SMK. Karya Anda layak diingat.
					</p>
					<div class="mt-6 flex flex-col sm:flex-row justify-center gap-3">
						<a href="/auth/sign-up" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors">
							Daftar sekarang
							<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<footer class="bg-slate-900 text-slate-400 py-10 sm:py-14">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-2.5">
					<span class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-blue-400 text-xs font-extrabold">K</span>
					<span class="font-bold text-white tracking-tight">KF13 Index</span>
				</div>
				<div class="flex items-center gap-6 text-xs sm:text-sm">
					<a href="https://github.com/klubfisika/index" target="_blank" rel="noopener" class="hover:text-white transition-colors">GitHub</a>
					<a href="https://klubfisika.github.io" target="_blank" rel="noopener" class="hover:text-white transition-colors">Klub Fisika</a>
					<a href="mailto:kf.teknis@gmail.com" class="hover:text-white transition-colors">Kontak</a>
				</div>
			</div>
			<div class="mt-6 pt-6 border-t border-white/10 text-center">
				<p class="text-xs text-slate-500">
					&copy; {new Date().getFullYear()} KF13 Index. Bagian dari Klub Fisika Indonesia.
				</p>
			</div>
		</div>
	</footer>
</div>
