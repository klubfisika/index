# AGENTS.md — KF13 Index

> Panduan untuk AI assistant yang bekerja di repository KF13 Research Index.
> Baca ini SEBELUM menulis kode apapun.

---

## Identitas Proyek

### Apa Ini?

**KF13 Index** adalah platform **arsip dan indeksasi riset terpadu** untuk jenjang SD, SMP, dan SMA/SMK. Ia adalah "SINTA untuk K-12" — tempat karya ilmiah peneliti muda Indonesia diindeks, diverifikasi, dan disitasi.

### Domain

- **Production**: index.klubfisika.or.id
- **Repository**: github.com/klubfisika/index
- **Monorepo**: github.com/klubfisika/community (apps/index)

### Mengapa Proyek Ini Ada

Di Indonesia, tidak ada platform yang serius mengindeks karya ilmiah tingkat sekolah. Karya siswa hilang setelah lomba. Siswa tidak punya portofolio riset terverifikasi untuk daftar kuliah/beasiswa. KF13 Index mengisi kekosongan ini — dengan standar verifikasi sesuai usia dan pengawasan wali/mentor/orangtua.

### Prinsip

- Non-profit & independen — tidak terafiliasi, tidak didanai pihak manapun
- Open-source — kode publik di bawah MIT
- Kids-friendly — konten aman, mode pengawasan untuk pengguna di bawah umur
- Verifikasi bertingkat — mentor/guru → peer → institusi
- Kredibilitas dari karya — reputasi dibangun dari hasil nyata

### Integrasi dengan Platform

Index adalah setengah dari KF13 Community Platform. Setengah lainnya adalah KF13 Platform — sosial media untuk ilmuwan/engineer. Keduanya berbagi satu identitas pengguna:

- Platform: siapa kamu (profil, jejaring, diskusi, reputasi)
- Index: apa karyamu (publikasi, verifikasi, sitasi, portofolio)

Lihat docs/VISION.md di monorepo untuk dokumentasi visi lengkap.

---

## Arsitektur

### Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | SvelteKit 2.x |
| UI | Svelte 5 (Runes: $state, $derived, $effect, $props) |
| Bahasa | TypeScript 6.x (strict) |
| Styling | Tailwind CSS 4.x + typography + forms |
| Database | PostgreSQL via Neon serverless |
| ORM | Drizzle ORM 0.45+ |
| Auth | Better Auth 1.4+ (email/password, Drizzle adapter) |
| i18n | Paraglide 2.x (en, es, id, jp, de) |
| Content | mdsvex |
| Testing | Vitest 4.x + Playwright 1.x + Storybook 10.x |
| Deployment | Vercel |
| Package Manager | bun |

### Kenapa Teknologi Ini?

- SvelteKit: SSR + static hybrid — ideal untuk archive site heavy-read
- Drizzle: Type-safe tanpa code generation, SQL-like, ringan
- Better Auth: SvelteKit native integration, Drizzle adapter built-in
- Neon: Serverless PostgreSQL, branching untuk test schema

### Flow Autentikasi

hooks.server.ts: sequence(handleParaglide, handleBetterAuth)
- handleParaglide: Parse locale, rewrite request
- handleBetterAuth: Extract session → event.locals.user + event.locals.session

### Direktori Penting

```
src/
├── app.d.ts              # Type declarations
├── app.html              # HTML shell
├── hooks.server.ts       # Paraglide → Better Auth
├── hooks.ts              # i18n reroute
├── lib/server/
│   ├── auth.ts           # Better Auth config
│   └── db/               # Drizzle schema & client
├── routes/
│   ├── +layout.svelte    # Root layout
│   ├── +page.svelte      # Homepage (PLACEHOLDER)
│   └── demo/             # Demo (JANGAN dihapus)
└── stories/              # Storybook
```

---

## Konvensi Kode

### TypeScript — Strict Mode

- strict: true — JANGAN pakai as any, @ts-ignore, @ts-expect-error
- Gunakan import type untuk type-only imports
- Deklarasikan app types di src/app.d.ts

### Svelte 5 — Runes Mode (DIPAKSA)

```svelte
<!-- BENAR -->
<script lang="ts">
  let { data } = $props();
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<!-- SALAH: Jangan Svelte 4 -->
<!-- export let data; $: doubled = count * 2; on:click={...} -->
```

### Pola SvelteKit

- PageServerLoad untuk fetch data server-side
- Actions untuk form submission
- $lib/server/ untuk server-only code
- $lib alias untuk shared components

### Pola Drizzle

- Query builder, BUKAN raw SQL
- Schema di src/lib/server/db/schema.ts
- Gunakan Drizzle relations untuk join query

### Tailwind CSS 4

- HANYA Tailwind utility classes — tidak ada custom CSS, tidak ada <style>
- Typography plugin untuk konten Markdown
- Forms plugin untuk form elements

### i18n — Paraglide

- import { m } from '$lib/paraglide/messages.js' untuk teks UI
- JANGAN hardcode string — semua teks lewat Paraglide

### Prettier Config

- Tabs, single quotes, NO trailing comma, 100 char width
- Tailwind class auto-sorted

### File Naming

- Komponen: PascalCase (ResearchCard.svelte)
- Route direktori: kebab-case
- Server modules: src/lib/server/

---

## Development Workflow

### Commands

| Command | Kegunaan |
|---|---|
| bun run dev | Dev server |
| bun run build | Production build |
| bun run check | TypeScript check |
| bun run lint | Prettier + ESLint |
| bun run test:unit | Vitest |
| bun run test:e2e | Playwright |
| bun run storybook | Storybook |
| bun run db:push | Push schema |
| bun run db:generate | Generate migration |
| bun run db:migrate | Run migration |
| bun run auth:schema | Generate Better Auth schema |

### Commit Convention

```
feat: Fitur baru
fix: Bugfix
refactor: Restrukturisasi
docs: Dokumentasi
chore: Maintenance
test: Testing
db: Database schema
```

---

## State Proyek

### Sudah Ada
- SvelteKit scaffold lengkap
- Better Auth (email/password, Drizzle adapter)
- Neon PostgreSQL tersambung
- Paraglide 5 bahasa
- Testing infrastructure (Vitest + Playwright + Storybook)
- Vercel deployment

### Belum Ada
- Homepage: masih "Welcome to SvelteKit"
- Database schema: hanya placeholder task table
- Halaman riset: belum ada satupun
- Integrasi auth dengan Platform
- API publik
- Upload & indeksasi karya

### Prioritas
1. Database schema — implementasi schema riset
2. Auth refinement — SSO readiness
3. Halaman utama — landing, search, daftar karya
4. Upload & indeksasi
5. Profil peneliti dengan portofolio

---

## Aturan untuk AI Assistant

### HARUS
1. Baca file ini dulu sebelum menulis kode
2. Svelte 5 runes ONLY — $state, $derived, $effect, $props
3. TypeScript strict — return types, no any
4. Tailwind CSS — tidak ada custom CSS
5. Paraglide i18n — teks lewat m.message_key()
6. Drizzle query builder — bukan raw SQL
7. $lib alias — import { auth } from '$lib/server/auth'
8. Test untuk setiap fitur baru

### JANGAN
1. ❌ as any, @ts-ignore, @ts-expect-error
2. ❌ Empty catch blocks
3. ❌ Hardcode string UI — gunakan Paraglide
4. ❌ Import server code di client component
5. ❌ Svelte 4 syntax (export let, $:, on:click)
6. ❌ Hapus demo routes
7. ❌ Hapus test yang fail — perbaiki
8. ❌ Commit .env, node_modules, .svelte-kit

---

<p align="center">
  <sub>Bagian dari KF13 Community Platform · Diinisiasi oleh Klub Fisika Indonesia</sub>
</p>
