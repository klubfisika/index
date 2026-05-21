# KF13 Index

> Arsip riset terpadu untuk jenjang SD, SMP, SMA/SMK — SINTA-nya peneliti muda Indonesia. Terintegrasi dengan platform sosial media KF13.

Bagian dari [KF13 Community Platform](https://github.com/klubfisika/community) — monorepo yang mengintegrasikan arsip riset dengan sosial media.

---

## Apa Ini?

**KF13 Index** adalah platform indeksasi karya ilmiah yang dirancang khusus untuk peneliti di tingkat pendidikan dasar dan menengah. Jika [SINTA](https://sinta.kemdikbud.go.id) fokus pada akademisi perguruan tinggi, KF13 Index hadir untuk:

- Siswa SD/SMP/SMA/SMK yang melakukan penelitian ilmiah
- Guru dan mentor yang membimbing riset
- Sekolah yang ingin mendokumentasikan karya ilmiah siswanya
- Komunitas yang ingin memverifikasi dan mensitasi karya ilmiah

---

## Mengapa Ini Penting?

Di Indonesia, tidak ada platform yang secara serius mengindeks dan memverifikasi karya ilmiah tingkat sekolah. Akibatnya:

- Karya ilmiah siswa hilang tanpa jejak setelah lomba/kompetisi
- Tidak ada rekam jejak riset yang bisa diverifikasi untuk siswa
- Sekolah dan guru kesulitan mendokumentasikan portofolio riset
- Tidak ada metrik yang mengukur dampak riset di tingkat K-12

KF13 Index hadir untuk mengisi kekosongan ini — dengan standar verifikasi yang sesuai usia dan pengawasan wali/mentor.

---

## Integrasi dengan Platform Sosial

Index tidak berdiri sendiri. Ia terintegrasi dengan [KF13 Platform](https://github.com/klubfisika/platform) melalui **satu identitas pengguna**:

```
┌─────────────────────────────────────────────────┐
│              SATU IDENTITAS PENGGUNA              │
├─────────────────────┬───────────────────────────┤
│   PLATFORM SOSIAL   │    INDEX ARSIP            │
│   (siapa kamu)      │    (apa karyamu)          │
├─────────────────────┼───────────────────────────┤
│ • Profil profesional│ • Karya ilmiah terindeks  │
│ • Reputasi (cendol) │ • Verifikasi peer/mentor  │
│ • Diskusi & jejaring│ • Sitasi & referensi      │
│ • Proyek kolaborasi │ • Portofolio riset        │
└─────────────────────┴───────────────────────────┘
         ↕ saling menguatkan ↕
```

- Karya yang terverifikasi di Index → memperkuat kredibilitas di Platform
- Reputasi di Platform → meningkatkan visibilitas karya di Index
- Satu profil menampilkan kedua dimensi

---

## Fitur (Roadmap)

### Fase 1 — Fondasi

- [ ] Indeksasi karya ilmiah (laporan riset, paper, poster, eksperimen)
- [ ] Metadata standar: judul, penulis, institusi, abstrak, kata kunci
- [ ] Sistem verifikasi bertingkat (mentor/guru → peer → publik)
- [ ] H-index untuk K-12

### Fase 2 — Integrasi

- [ ] Single sign-on dengan Platform sosial
- [ ] Auto-post ke feed saat karya baru terindeks
- [ ] Profil terpadu (sosial + akademik)
- [ ] Badge dan sertifikat verifikasi

### Fase 3 — Ekosistem

- [ ] Sitasi dan reference tracking
- [ ] API publik untuk institusi pendidikan
- [ ] Ekspor portofolio (PDF, JSON)
- [ ] Integrasi dengan kompetisi sains nasional

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [SvelteKit](https://svelte.dev/docs/kit) 2 · Svelte 5 (runes mode) |
| Bahasa | TypeScript 6 (strict) |
| Styling | Tailwind CSS 4 (typography + forms plugins) |
| Database | PostgreSQL via [Neon](https://neon.tech) · [Drizzle ORM](https://orm.drizzle.team) |
| Auth | [Better Auth](https://better-auth.com) (email/password) |
| i18n | [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) (en, es, id, jp, de) |
| Content | [mdsvex](https://mdsvex.pngwn.io) (Markdown as Svelte) |
| Testing | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) + [Storybook](https://storybook.js.org) |
| Deployment | Vercel |

---

## Development

### Setup

```bash
bun install
cp .env.example .env

# .env:
# DATABASE_URL=postgres://...
# BETTER_AUTH_SECRET=<32 char random string>
# ORIGIN=http://localhost:5173
```

### Commands

```bash
bun run dev           # Development server
bun run build         # Production build
bun run check         # TypeScript check
bun run lint          # Prettier + ESLint
bun run format        # Prettier write
bun run test:unit     # Vitest
bun run test:e2e      # Playwright
bun run storybook     # Storybook dev
bun run db:push       # Drizzle schema push
bun run db:generate   # Drizzle schema generate
bun run db:migrate    # Drizzle migrate
bun run db:studio     # Drizzle Studio
bun run auth:schema   # Generate Better Auth schema
```

---

## Struktur Proyek

```
src/
├── app.d.ts              # Type declarations (user, session)
├── app.html              # HTML shell (Paraglide i18n)
├── hooks.server.ts       # Server hooks (Paraglide → Better Auth)
├── hooks.ts              # Client reroute (i18n URL)
├── lib/
│   ├── server/
│   │   ├── auth.ts       # Better Auth configuration
│   │   └── db/           # Drizzle schema & client
│   ├── assets/           # Static assets
│   └── index.ts          # $lib barrel
├── routes/
│   ├── +layout.svelte    # Root layout (i18n, favicon)
│   ├── +page.svelte      # Homepage
│   └── demo/             # Feature demos
└── stories/              # Storybook components
```

---

## Domain

Production: [index.klubfisika.or.id](https://index.klubfisika.or.id)

---

## Kontribusi

Proyek ini adalah bagian dari [KF13 Community monorepo](https://github.com/klubfisika/community). Untuk berkontribusi:

1. Clone monorepo: `git clone --recurse-submodules git@github.com:klubfisika/community.git`
2. Masuk ke `apps/index`
3. Baca issue di [GitHub Issues](https://github.com/klubfisika/index/issues)
4. Buat pull request

---

<p align="center">
  <sub>Bagian dari <a href="https://github.com/klubfisika/community">KF13 Community Platform</a> · Diinisiasi oleh <a href="https://klubfisika.github.io">Klub Fisika Indonesia</a></sub>
</p>
