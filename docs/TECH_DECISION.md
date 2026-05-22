# TECH_DECISION.md — Keputusan Arsitektur Teknologi KF13

> Dokumentasi hasil brainstorming dan analisis perbandingan teknologi untuk KF13 Platform dan KF13 Index.
> Mencakup evaluasi DSpace-CRIS, HumHub, Mastodon, dan pendekatan custom build.

---

## Konteks: Dua Jalur yang Berbeda

Setelah riset mendalam, ada dua pendekatan fundamental yang bisa diambil:

### Jalur A — Custom Build (Yang Sudah Kita Bangun)

| Komponen | Teknologi |
|----------|-----------|
| Platform sosial | Qwik City (dibangun dari nol) |
| Index arsip | SvelteKit + Drizzle (dibangun dari nol) |
| Auth | Better Auth + bcrypt |
| Database | PostgreSQL via Neon |

### Jalur B — Open-Source Existing (Rekomendasi Gemini)

| Komponen | Teknologi |
|----------|-----------|
| Arsip riset | DSpace-CRIS (CRIS open-source) |
| Platform sosial | HumHub (jejaring sosial modular) atau Mastodon |

---

## Analisis Perbandingan

### DSpace-CRIS vs Custom SvelteKit (untuk Index)

| Aspek | DSpace-CRIS | Custom SvelteKit |
|-------|-------------|-----------------|
| **Waktu ke production** | ✅ 2–4 minggu deploy | ❌ 6–12 bulan development |
| **Standar global** | ✅ ORCID, Crossref, Dublin Core, OAI-PMH built-in | ❌ Harus implementasi sendiri |
| **Interoperabilitas** | ✅ Karya terindeks otomatis di Google Scholar, OpenAIRE | ❌ Perlu SEO manual |
| **UI/UX modern** | ❌ UI klasik, kurang engaging untuk anak muda | ✅ Tailwind modern, mobile-first |
| **Kustomisasi** | ❌ Terbatas pada arsitektur DSpace | ✅ Bebas total |
| **Fitur K-12 spesifik** | ❌ Didesain untuk universitas, bukan SD–SMA | ✅ Bisa dirancang khusus K-12 |
| **Integrasi Platform** | ❌ API ada tapi tidak native ke Qwik/SvelteKit | ✅ Shared DB, shared auth |

**Verdict**: DSpace-CRIS unggul di standar dan kecepatan deploy. Tapi UI-nya tidak cocok untuk audiens anak muda, dan integrasi dengan Platform sosial akan rumit karena dua sistem terpisah.

---

### HumHub vs Custom Qwik City (untuk Platform)

| Aspek | HumHub | Custom Qwik City |
|-------|--------|-----------------|
| **Fitur siap pakai** | ✅ Spaces, profil, wiki, calendar, polls — semua built-in | ❌ Semua harus dibangun |
| **Modular** | ✅ Puluhan modul gratis | ❌ Belum ada modul |
| **UI** | ❌ Mirip forum enterprise, bukan sosial media modern | ✅ Feed-style, mobile-first |
| **Gamifikasi Kaskus** | ❌ Tidak ada — harus custom module | ✅ Sudah direncanakan built-in |
| **Performa** | ❌ Page-based, tidak kompetitif | ✅ Qwik resumable, sangat cepat |
| **Kustomisasi branding** | ⚠️ Terbatas pada tema | ✅ Bebas penuh |

**Verdict**: HumHub bagus untuk internal tools / knowledge base. Tapi untuk platform sosial yang engaging untuk Gen Z dengan gamifikasi Kaskus — Qwik City jauh lebih cocok.

---

### Mastodon vs Custom Qwik City (untuk Platform)

| Aspek | Mastodon | Custom Qwik City |
|-------|----------|-----------------|
| **Filosofi** | ✅ Desentralisasi, anti-algoritma — cocok dengan nilai Klub Fisika | ⚠️ Tergantung implementasi |
| **Fitur** | ⚠️ Microblogging timeline-based, bukan LinkedIn-style | ✅ Bebas desain fitur |
| **Profil profesional** | ❌ Tidak mendukung profil ala LinkedIn/CV ilmiah | ✅ Dibangun untuk itu |
| **Gamifikasi** | ❌ Tidak ada | ✅ Cendol/bata built-in |

**Verdict**: Mastodon cocok secara filosofi (desentralisasi, open-source), tapi bukan produk yang tepat. Profil Mastodon tidak dirancang sebagai "CV ilmiah" atau portofolio riset.

---

## Keputusan: Hybrid Approach

**Jangan memilih salah satu. Gabungkan kekuatan keduanya.**

### Untuk Index (Arsip Riset) — Hybrid DSpace-CRIS + SvelteKit

```
┌─────────────────────────────────────────────────┐
│              KF13 INDEX ARCHITECTURE             │
├──────────────────────┬──────────────────────────┤
│   FRONTEND           │   BACKEND                │
│   SvelteKit          │   DSpace-CRIS            │
│   (custom UI)        │   (standar global)       │
├──────────────────────┼──────────────────────────┤
│ • Tailwind modern    │ • Dublin Core metadata   │
│ • Mobile-first       │ • OAI-PMH protocol       │
│ • Kids-friendly UX   │ • ORCID integration      │
│ • Gamifikasi         │ • Crossref DOI           │
│ • Auth terpadu       │ • OpenAIRE indexing      │
└──────────────────────┴──────────────────────────┘
              ↕ DSpace REST API ↕
```

**Cara kerja**:
- **Backend**: DSpace-CRIS menangani standar metadata (Dublin Core), interoperabilitas (OAI-PMH, ORCID, Crossref), dan indexing ke ekosistem global
- **Frontend**: SvelteKit dengan Tailwind CSS yang mobile-first, modern, dan engaging untuk anak muda
- **Integrasi**: DSpace punya REST API — frontend SvelteKit query via API, auth di-bridge ke Better Auth

**Keuntungan hybrid ini**:
1. Dapat standar internasional secara gratis (tidak perlu implementasi OAI-PMH dari nol — pekerjaan berbulan-bulan)
2. UI tetap modern dan kids-friendly
3. Karya otomatis terindeks di Google Scholar, OpenAIRE, dan repositori global
4. Tidak reinvent the wheel untuk infrastruktur metadata

### Untuk Platform (Sosial Media) — Custom Qwik City

**Tetap custom.** Tidak ada platform open-source yang cocok untuk "LinkedIn × Kaskus untuk STEM Indonesia". HumHub terlalu enterprise. Mastodon terlalu microblogging. Custom build adalah pilihan tepat.

---

## Ide Gemini yang Diadopsi (Kids-Safety & Moderasi)

Terlepas dari keputusan tech stack, beberapa rekomendasi dari analisis Gemini relevan untuk diimplementasikan:

| Ide | Status | Detail Implementasi |
|-----|--------|---------------------|
| **Verifiable Parental Consent** (COPPA-style) | ✅ Diadopsi | Akun <18 tahun wajib verifikasi wali via email/WhatsApp saat registrasi |
| **Privacy by default untuk anak** | ✅ Diadopsi | Mode pengawasan default aktif untuk pengguna di bawah umur |
| **Moderasi AI + manusia** | ✅ Diadopsi | Layer moderasi hybrid: AI filter otomatis + moderator komunitas |
| **Notifikasi persetujuan ke wali** | ✅ Diadopsi | Fitur "parental approval" untuk posting pertama / karya baru anak |
| **Separated UX by level** | ✅ Diadopsi | Mode "Pelajar" (dengan pengawasan) vs mode "Profesional" |

---

## Yang Tidak Berubah

Apapun jalur teknisnya, **visi inti tetap sama**:

> Satu identitas, dua fungsi — Platform sosial membangun reputasi, Index membangun kredibilitas akademik. Keduanya saling menguatkan.

### Invariant Architecture Decisions

1. **Satu identitas pengguna** — shared auth via cookie domain `.klubfisika.or.id`
2. **Monorepo** — `github.com/klubfisika/community` dengan `apps/platform` dan `apps/index`
3. **Open-source** — kode publik di bawah MIT
4. **Non-profit** — tidak ada iklan, tidak jual data pengguna
5. **Kids-friendly** — verifikasi usia, mode pengawasan, konten aman

---

## Risiko Pendekatan Hybrid DSpace + SvelteKit

| Risiko | Mitigasi |
|--------|----------|
| DSpace-CRIS kompleks untuk di-deploy dan dikonfigurasi | Gunakan Docker Compose, dokumentasikan setup lengkap |
| REST API DSpace bisa berubah di versi baru | Pin versi DSpace, tulis adapter layer di SvelteKit |
| Auth bridge antara Better Auth dan DSpace | Implementasi SSO via JWT — DSpace mendukung external auth |
| DSpace membutuhkan resource server lebih besar | Host DSpace di VPS terpisah, frontend tetap di Vercel |
| Overhead operasional dua sistem | Otomasi dengan CI/CD, monitoring terpusat |

---

## Referensi

- [DSpace-CRIS Documentation](https://wiki.lyrasis.org/display/DSPACECRIS)
- [DSpace REST API](https://wiki.lyrasis.org/display/DSDOC7x/REST+API)
- [OAI-PMH Protocol](https://www.openarchives.org/pmh/)
- [ORCID Integration](https://info.orcid.org/documentation/)
- [Crossref DOI Registration](https://www.crossref.org/)
- [OpenAIRE Guidelines](https://guidelines.openaire.eu/)
- [HumHub](https://www.humhub.com/)
- [Mastodon](https://joinmastodon.org/)

---

<p align="center">
  <sub>Bagian dari <a href="https://github.com/klubfisika/community">KF13 Community Platform</a> · Diinisiasi oleh <a href="https://klubfisika.github.io">Klub Fisika Indonesia</a></sub>
</p>
