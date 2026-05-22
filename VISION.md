# VISION.md — KF13 Community Platform

> Dokumentasi hasil brainstorming dan analisis mendalam visi KF13 Community Platform.
> Mencakup KF13 Platform (sosial media untuk ilmuwan) dan KF13 Index (arsip riset K-12).
> Dokumen ini adalah referensi utama bagi developer, kontributor, dan siapapun yang ingin memahami **mengapa** platform ini dibangun.

---

## Daftar Isi

1. [Ini Bukan Sekadar Platform — Ini Gerakan](#1-ini-bukan-sekadar-platform--ini-gerakan)
2. [Apa yang Dibangun](#2-apa-yang-dibangun)
3. [Model Kredibilitas yang Berbeda](#3-model-kredibilitas-yang-berbeda)
4. [Mengapa Ini Ada dan Mengapa Sekarang](#4-mengapa-ini-ada-dan-mengapa-sekarang)
5. [Identitas Organisasi](#5-identitas-organisasi)
6. [Referensi Komparatif dari Riset Ekosistem Ilmiah](#6-referensi-komparatif-dari-riset-ekosistem-ilmiah)
7. [Risiko dan Mitigasi](#7-risiko-dan-mitigasi)
8. [Urutan Prioritas Pengembangan](#8-urutan-prioritas-pengembangan)
9. [Arsitektur Teknis](#9-arsitektur-teknis)
10. [Beyond Klub Fisika — Milik Komunitas](#10-beyond-klub-fisika--milik-komunitas)
11. [Visi Akhir](#11-visi-akhir)

---

## 1. Ini Bukan Sekadar Platform — Ini Gerakan

KF13 Community Platform bukan sekadar aplikasi atau startup. Ia adalah **infrastruktur kredibilitas** untuk generasi peneliti muda Indonesia yang selama ini tidak punya tempat.

Di Indonesia:
- Ada platform untuk berbagi konten hiburan — tapi tidak ada tempat untuk berbagi karya ilmiah yang terverifikasi
- Ada SINTA untuk dosen dan akademisi perguruan tinggi — tapi tidak ada ekuivalennya untuk peneliti muda K-12
- Ada LinkedIn untuk membangun jejaring profesional — tapi tidak ada yang didesain untuk ilmuwan dan engineer Indonesia dengan konteks lokal

KF13 hadir untuk mengisi tiga kekosongan itu sekaligus, dengan satu ekosistem yang saling menguatkan.

---

## 2. Apa yang Dibangun

Dua platform dengan **satu identitas pengguna**:

```
┌─────────────────────────────────────────────────────────────┐
│                   SATU IDENTITAS PENGGUNA                    │
├──────────────────────────────┬──────────────────────────────┤
│       KF13 PLATFORM          │         KF13 INDEX           │
│       (siapa kamu)           │         (apa karyamu)        │
├──────────────────────────────┼──────────────────────────────┤
│ • Profil profesional         │ • Karya ilmiah terindeks     │
│ • Reputasi (cendol/bata)     │ • Verifikasi peer/mentor     │
│ • Feed & diskusi ilmiah      │ • Sitasi & referensi         │
│ • Proyek kolaborasi          │ • Portofolio riset           │
│ • Jejaring ilmuwan Indonesia │ • DOI untuk setiap karya     │
└──────────────────────────────┴──────────────────────────────┘
                  ↕ saling menguatkan ↕
      Karya di Index → menguatkan kredibilitas di Platform
      Reputasi di Platform → meningkatkan visibilitas di Index
```

### KF13 Platform — LinkedIn × Kaskus untuk Ilmuwan Indonesia

Sosial media profesional untuk ilmuwan, engineer, dan peneliti Indonesia. Bukan TikTok, bukan Instagram — lebih dekat ke LinkedIn, tapi dengan **DNA komunitas Kaskus** yang terbukti relevan selama 20+ tahun di Indonesia.

**Apa yang membedakan dari LinkedIn:**
- Gamifikasi berbasis kontribusi nyata (cendol/bata), bukan sekadar endorsement
- Komunitas berbahasa Indonesia dengan konteks lokal
- Profil yang terhubung langsung ke karya terverifikasi di Index
- Didesain untuk semua tingkat — dari siswa SMA hingga profesor

### KF13 Index — SINTA-nya Peneliti Muda K-12

Platform indeksasi karya ilmiah untuk siswa SD, SMP, SMA/SMK. Mengisi kekosongan besar: **tidak ada satu pun platform di Indonesia atau di dunia yang serius mengindeks dan memverifikasi karya ilmiah tingkat sekolah.**

**Apa yang diindeks:**
- Laporan penelitian ilmiah
- Makalah dan paper
- Poster ilmiah
- Laporan eksperimen
- Karya dari lomba sains (OSN, KIR, LKIR, dan sejenisnya)

**Siapa yang menggunakannya:**
- Siswa SD/SMP/SMA/SMK sebagai penulis karya
- Guru dan mentor sebagai verifikator pertama
- Peer reviewer dari sesama komunitas
- Institusi pendidikan yang ingin mendokumentasikan portofolio siswa
- Seleksi beasiswa dan perguruan tinggi yang butuh bukti riset terverifikasi

---

## 3. Model Kredibilitas yang Berbeda

### Masalah dengan Platform yang Ada

| Platform | Cara Membangun Kredibilitas | Masalah |
|----------|----------------------------|---------|
| LinkedIn | Koneksi + endorsement | Siapapun bisa endorse siapapun, tidak ada verifikasi |
| Instagram | Likes + followers | Sinyal yang sangat lemah dan mudah dimanipulasi |
| ResearchGate | Self-upload karya | Tidak ada verifikasi keaslian, tidak ada reputasi sosial |
| SINTA | Publikasi jurnal | Hanya untuk akademisi, tidak ada komponen sosial |

### Model KF13: Kredibilitas Berlapis

KF13 membangun kredibilitas dari dua sumber yang saling memperkuat:

```
┌──────────────────────────────┐
│      KARYA TERVERIFIKASI     │  ← KF13 Index
│  • Paper, riset, eksperimen  │
│  • Di-review mentor/guru     │
│  • Peer reviewed komunitas   │
│  • DOI resmi, bisa disitasi  │
│  • Tidak bisa di-fake        │
└──────────────┬───────────────┘
               │
               │  setiap karya terverifikasi
               │  memperkuat bobot reputasi
               │
┌──────────────▼───────────────┐
│      REPUTASI KOMUNITAS      │  ← KF13 Platform
│  • Cendol dari peer          │
│  • Bobot cendol ≠ likes      │
│  • Histori kontribusi nyata  │
│  • Jejaring organik          │
└──────────────────────────────┘
```

**Kredibilitas = Karya Terverifikasi + Reputasi Komunitas**

Tidak ada platform di dunia yang menggabungkan keduanya dengan cara ini:
- LinkedIn tidak bisa memverifikasi bahwa Anda benar-benar menulis paper itu
- ResearchGate tidak peduli dengan reputasi sosial dan kontribusi komunitas Anda
- SINTA tidak punya komponen sosial sama sekali

### Mengapa Cendol Lebih Kuat dari Likes

| | Likes (Instagram/TikTok) | Cendol (KF13) |
|---|---|---|
| **Siapa yang memberi** | Siapapun | Anggota komunitas dengan track record |
| **Dasar pemberian** | Konten yang menarik | Kontribusi nyata + karya terverifikasi |
| **Bisa dimanipulasi** | Ya (beli likes) | Jauh lebih sulit — perlu histori komunitas |
| **Bobot** | Flat, semua sama | Berbobot berdasarkan reputasi pemberi |
| **Sinyal** | Popularitas sesaat | Kredibilitas kumulatif jangka panjang |

**Ilustrasi nyata**: 200 cendol dari 15 paper terverifikasi > 5.000 likes di Instagram.

---

## 4. Mengapa Ini Ada dan Mengapa Sekarang

### 4.1 Target Pasar yang Tidak Dilayani Siapapun

SINTA hanya melayani akademisi perguruan tinggi. Padahal ada kekosongan besar di level K-12:

- **Ratusan ribu siswa** SMA/SMK setiap tahun ikut OSN, KIR, lomba karya ilmiah nasional
- Karya mereka **hilang tanpa jejak** setelah lomba selesai — tidak ada yang mengarsipkan secara serius
- Untuk mendaftar kuliah di jurusan STEM top atau beasiswa LPDP, siswa butuh **portofolio riset terverifikasi** — tapi tidak ada platform yang menyediakan itu
- **Guru pembimbing** tidak punya cara untuk mendokumentasikan dan membuktikan kontribusi bimbingan mereka
- **Sekolah** tidak punya cara untuk menampilkan rekam jejak riset institusional mereka

KF13 Index mengisi celah yang tidak ada pemainnya. **Blue ocean yang nyata.**

### 4.2 DNA Kaskus Adalah Senjata Rahasia

Sistem cendol/bata dan rank progression bukan gimmick atau novelty feature. Ini adalah **bahasa komunitas Indonesia** yang sudah terbukti membangun engagement organik selama 20+ tahun di Kaskus.

Yang cerdas adalah mengadaptasinya untuk konteks ilmiah:

| Aspek | Kaskus Original | KF13 Adaptasi |
|-------|----------------|---------------|
| **Cendol** | Reaksi emosional terhadap konten menarik | Endorsement berbobot terhubung ke karya nyata |
| **Bata** | Penalti untuk konten buruk/spam | Sinyal negatif untuk konten tidak berkualitas |
| **Rank/Level** | Berdasarkan jumlah post | Berdasarkan karya terverifikasi + kontribusi |
| **Komunitas** | Forum topik umum | Komunitas fokus pada sains dan riset |

### 4.3 Faktor Makro yang Membuat Ini Relevan Sekarang

| Faktor | Kondisi Saat Ini | Implikasi untuk KF13 |
|--------|-----------------|----------------------|
| **AI & otomatisasi** | AI bisa generate teks, kode, gambar dalam hitungan detik | Soft skills + kredibilitas personal yang *terverifikasi* makin kritis. KF13 adalah bukti sosial yang tidak bisa di-generate AI |
| **Post-COVID remote-first** | Kolaborasi daring antar pelajar/peneliti makin normal dan diterima | Timing tepat untuk platform kolaborasi ilmiah digital |
| **Generasi Z digital-native** | Gen Z menghabiskan waktu di platform digital tapi butuh lebih dari sekadar hiburan | KF13 memberi mereka platform serius yang tetap engaging |
| **Beasiswa LPDP & luar negeri** | Seleksi makin kompetitif, butuh diferensiasi | Portofolio riset terverifikasi di KF13 Index adalah diferensiator nyata |
| **Skeptisisme terhadap Big Tech** | Makin banyak orang sadar soal privasi data dan iklan | Model non-profit KF13 yang transparan menjadi keunggulan |

---

## 5. Identitas Organisasi

### 5.1 Klub Fisika Indonesia

- **Status**: Non-profit, independen — tidak terafiliasi dengan partai, pemerintah, atau korporasi manapun
- **Pendanaan**: Mandiri melalui unit usaha (merchandise, kelas online, buku, event, marketplace alat sains)
- **Prinsip inti**:
  - Open-source — kode publik di bawah MIT License
  - Kids-friendly — konten aman, mode pengawasan untuk pengguna di bawah umur
  - Verifikasi bertingkat — tidak ada karya yang masuk tanpa proses review
  - Kredibilitas dari karya — reputasi dibangun dari hasil nyata, bukan follower count

### 5.2 Model Bisnis yang Selaras dengan Misi

Platform **tidak menjual data pengguna**. Platform **tidak menjual iklan**. Tidak ada konflik kepentingan antara pendapatan dan misi.

Sumber pendapatan yang direncanakan — semua selaras dengan misi pendidikan sains:

| Unit Usaha | Relevansi dengan Misi |
|-----------|----------------------|
| Merchandise (kaos, poster sains) | Membangun awareness dan identitas komunitas |
| Kelas online (fisika, riset, metodologi) | Langsung mendukung kapasitas peneliti muda |
| Buku dan modul riset | Memperkuat ekosistem literasi sains |
| Event (lomba, workshop, seminar) | Mempertemukan komunitas secara fisik |
| Marketplace alat sains | Memudahkan akses ke peralatan riset |

Di era skeptisisme terhadap Big Tech, model ini adalah **aset kepercayaan yang tidak ternilai**.

### 5.3 Inspirasi Filosofis

Visi KF13 dibangun di atas fondasi pemikiran tokoh-tokoh Indonesia yang percaya bahwa pendidikan dan sains adalah instrumen kemajuan bangsa:

| Tokoh | Nilai yang Diadopsi |
|-------|---------------------|
| **Ki Hajar Dewantara** | Pendidikan untuk semua, tanpa diskriminasi kelas sosial atau ekonomi |
| **HOS Cokroaminoto** | Membangun pemimpin dan pemikir dari akar rumput, bukan dari elite |
| **BJ Habibie** | Sains dan teknologi sebagai instrumen kemajuan bangsa yang konkret |
| **Prof. Yohanes Surya** | Sains bisa dan harus dapat diakses oleh anak Indonesia dari mana saja |

---

## 6. Referensi Komparatif dari Riset Ekosistem Ilmiah

Berdasarkan analisis mendalam terhadap ekosistem platform indeksasi ilmiah nasional dan global (lihat `SINTA_RESEARCH.md` untuk dokumen lengkap), berikut insight kunci yang membentuk arsitektur KF13:

### 6.1 Platform yang Menjadi Inspirasi Arsitektur

| Platform Referensi | Apa yang Diadopsi KF13 | Mengapa |
|--------------------|------------------------|---------|
| **Dimensions AI** | Pendekatan inklusif untuk Global South, metadata terhubung lintas platform | Menghindari bias Western-centric yang ada di Scopus/WoS |
| **RIN BRIN** | Sistem DOI untuk setiap karya; model Dataverse untuk raw data repository | Membuat karya siswa dapat disitasi secara global |
| **Indonesia OneSearch** | OAI-PMH harvesting; NLP anti-plagiarisme Bahasa Indonesia | Integrasi ke ekosistem nasional, deteksi plagiarisme |
| **DOAJ** | Filosofi ethics-first, non-komersial, tolak konten predator | Menjaga kualitas dan kepercayaan platform |
| **ResearchGate** | Jejaring sosial yang terhubung langsung ke karya nyata | Model untuk KF13 Platform yang berbasis karya |
| **Neliti** | AI assistant untuk ringkasan otomatis dan bantuan reviewer | Rencana fitur AI untuk membantu proses review |
| **Kaskus** | Sistem gamifikasi komunitas yang terbukti di Indonesia | DNA cendol/bata yang sudah familiar di komunitas Indonesia |

### 6.2 Perbedaan Mendasar dari SINTA

Penting dipahami: KF13 Index bukan saingan SINTA. Ia mengisi ruang yang sama sekali tidak dilayani SINTA.

| Dimensi | SINTA | KF13 Index |
|---------|-------|------------|
| **Audiens** | Dosen, akademisi perguruan tinggi | Siswa SD–SMA, guru, mentor |
| **Tujuan** | Evaluasi kinerja (BKD), sertifikasi dosen | Portofolio riset, verifikasi karya K-12 |
| **Standar penerimaan** | Jurnal Q1–Q4 internasional | Verifikasi bertingkat (mentor → peer → publik) |
| **Metrik utama** | H-index, sitasi, quartile ranking | Cendol/bata berbasis kontribusi komunitas |
| **Jenis konten** | Jurnal ilmiah bereputasi | Laporan riset, poster, eksperimen, paper K-12 |
| **Model kerja** | Agregator metadata dari sumber eksternal | Platform verifikasi mandiri dengan proses review |
| **Komponen sosial** | Tidak ada | Platform sosial terintegrasi penuh |

### 6.3 Fitur Roadmap yang Diinspirasi dari Riset Ekosistem

Berdasarkan gap analysis terhadap platform yang ada:

| Fitur | Inspirasi dari | Prioritas |
|-------|---------------|-----------|
| **DOI Assignment** | RIN BRIN | Tinggi — kredibilitas sitasi global |
| **Raw Data Repository** | RIN BRIN (Dataverse model) | Menengah — reproducible science |
| **NLP Anti-Plagiarisme** | Indonesia OneSearch | Tinggi — integritas konten |
| **OAI-PMH Export** | Indonesia OneSearch | Menengah — integrasi ekosistem nasional |
| **AI Document Assistant** | Neliti Copilot | Rendah — fitur lanjutan |
| **Gamifikasi Cendol/Bata** | Kaskus | Tinggi — engagement komunitas |
| **Ethics-first moderation** | DOAJ | Tinggi — kepercayaan platform |

---

## 7. Risiko dan Mitigasi

| Risiko | Dampak Potensial | Mitigasi |
|--------|-----------------|----------|
| **Verifikasi longgar → kredibilitas runtuh** | Platform kehilangan kepercayaan, karya abal-abal masuk | Standar verifikasi ketat sejak hari pertama. Mentor/guru harus terverifikasi identitasnya (.sch.id, .ac.id). Peer review tidak boleh anonim untuk karya yang diklaim publik. |
| **Cold start — tidak ada konten, tidak ada user** | Platform terlihat kosong, tidak menarik user baru | Seed dengan konten berkualitas dari anggota awal. Undang 50 peneliti muda untuk upload karya nyata sebelum public launch. Buat landing page yang kuat dulu. |
| **Platform sosial + arsip = terlalu kompleks** | Overengineering, tidak ada yang selesai dengan baik | Fase 1: sempurnakan Platform sosial dulu. Index menyusul. Tidak ada parallel development saat resource terbatas. |
| **"Kids-friendly" vs "LinkedIn-alike" bisa konflik UX** | User bingung, experience tidak kohesif | Pisahkan UX berdasarkan level: mode "Pelajar" (dengan pengawasan wali/mentor) vs mode "Profesional". Dua mode dalam satu platform. |
| **Maintainer kelelahan** | Development stagnan, bug tidak diperbaiki | Open-source dari awal. Kontributor = komunitas. Dokumentasi yang baik dari hari pertama. Bukan hanya satu orang. |
| **Konten predator atau verifikasi palsu** | Karya plagiat atau dibuat-buat masuk ke index | Anti-plagiarisme NLP, verifikasi institusi (.sch.id, .ac.id), reviewer berlapis, sistem pelaporan komunitas. |
| **Integrasi SSO gagal di tengah jalan** | Dua platform tidak tersambung, user harus login dua kali | Desain shared auth dari awal menggunakan cookie domain `.klubfisika.or.id`. Jangan tunda integrasi auth. |

---

## 8. Urutan Prioritas Pengembangan

### Prinsip Dasar: Fondasi Sebelum Amplifier

> Platform sosial adalah fondasi. Index adalah amplifier.
> Jangan bangun amplifier sebelum fondasinya kuat.

```
 FONDASI                                          AMPLIFIER
    │                                                 │
    ▼                                                 ▼
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  FASE 1  │───▶│  FASE 2  │───▶│  FASE 3  │───▶│  FASE 4  │
│ Platform │    │  Index   │    │Integrasi │    │Ekosistem │
│  Sosial  │    │ Arsip    │    │Penuh     │    │Nasional  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### Fase 1 — Platform Sosial (Fondasi)

**Deliverable**: Platform sosial yang fungsional dan engaging untuk komunitas ilmuwan Indonesia.

- Feed, profil, diskusi, gamifikasi dasar (cendol/bata)
- Verifikasi email institusi (.sch.id, .ac.id) sebagai trust signal pertama
- Mode "Pelajar" vs mode "Profesional" yang terdefinisi jelas
- Parental consent flow untuk pengguna di bawah umur
- Rekrut 20–50 power user dari komunitas sebelum public launch
- Open-source dari hari pertama

### Fase 2 — Index (Amplifier)

**Deliverable**: Platform indeksasi karya ilmiah K-12 yang kredibel dan bisa diandalkan.

- Definisi yang sangat jelas tentang "karya ilmiah K-12" yang diterima — konsistensi = kredibilitas
- Verifikasi bertingkat: mentor/guru → peer reviewer → publik
- H-index adaptasi untuk K-12 (dengan konteks yang sesuai usia)
- Upload dan metadata standar: judul, penulis, institusi, abstrak, kata kunci, jenjang
- Sistem moderasi awal

### Fase 3 — Integrasi (Ekosistem Terpadu)

**Deliverable**: Dua platform yang terasa seperti satu pengalaman pengguna yang kohesif.

- Shared SSO via cookie domain `.klubfisika.or.id`
- Auto-post ke Platform feed saat karya baru terindeks di Index
- Profil terpadu: dimensi sosial + akademik dalam satu halaman
- DOI system untuk setiap karya terindeks
- API publik versi pertama
- Ekspor portofolio (PDF, JSON) untuk keperluan mendaftar beasiswa/universitas

### Fase 4 — Koneksi Ekosistem Nasional

**Deliverable**: KF13 sebagai bagian dari ekosistem riset nasional Indonesia.

- Integrasi OAI-PMH dengan Indonesia OneSearch (Perpusnas)
- API untuk institusi pendidikan (sekolah, dinas pendidikan)
- Koneksi formal dengan kompetisi sains nasional (OSN, KIR, LKIR)
- NLP anti-plagiarisme terintegrasi
- AI Document Assistant untuk reviewer

---

## 9. Arsitektur Teknis

> Dokumen ini hanya mencakup ringkasan. Lihat referensi berikut untuk detail:
> - `docs/DATABASE_SCHEMA.md` — 18-table schema lengkap dengan DDL dan Drizzle ORM
> - `docs/TECH_DECISION.md` — Keputusan teknologi: DSpace-CRIS vs Custom, HumHub vs Qwik, dll
> - `AGENTS.md` — Panduan lengkap untuk developer dan AI assistant

### 9.1 Tech Stack per Platform

| Layer | KF13 Platform | KF13 Index |
|-------|---------------|------------|
| **Framework** | Qwik City | SvelteKit 2 + Svelte 5 (runes mode) |
| **Language** | TypeScript (strict) | TypeScript 6 (strict) |
| **Styling** | Tailwind CSS 4 | Tailwind CSS 4 (typography + forms) |
| **Database** | PostgreSQL via Neon | PostgreSQL via Neon |
| **ORM** | Drizzle ORM | Drizzle ORM 0.45+ |
| **Auth** | Better Auth | Better Auth 1.4+ (shared) |
| **Deployment** | Cloudflare Workers | Vercel |
| **i18n** | — | Paraglide 2.x (en, id, es, jp, de) |
| **Content** | — | mdsvex |
| **Testing** | Vitest + Playwright | Vitest 4.x + Playwright 1.x + Storybook 10.x |

### 9.2 Shared Identity Architecture

```
                    .klubfisika.or.id
           ┌─────────────┴─────────────┐
           │                           │
  platform.klubfisika.or.id   index.klubfisika.or.id
           │                           │
           │   ← shared cookie →       │
           │   ← shared session →      │
           │   ← shared user ID →      │
           │                           │
      KF13 Platform              KF13 Index
      (Qwik City)                (SvelteKit)
           │                           │
           └──────────┬────────────────┘
                      │
               Better Auth SSO
               PostgreSQL (Neon)
```

**Prinsip**: Satu login, dua platform. User tidak perlu membuat akun dua kali.

### 9.3 Monorepo Structure

```
github.com/klubfisika/community    ← root monorepo
├── apps/
│   ├── platform/                  ← github.com/klubfisika/platform (submodule)
│   └── index/                     ← github.com/klubfisika/index (submodule)
├── packages/
│   ├── shared-types/              ← TypeScript types bersama
│   └── shared-auth/               ← Better Auth config bersama
└── docs/
    └── VISION.md                  ← dokumen visi monorepo
```

---

## 10. Beyond Klub Fisika — Milik Komunitas

### 10.1 Domain Saat Ini Hanya Titik Awal

Saat ini platform berjalan di bawah domain `klubfisika.or.id`:

- `index.klubfisika.or.id` — KF13 Index (arsip riset)
- `community.klubfisika.or.id` — KF13 Platform (sosial media)

Ini adalah **titik awal**, bukan identitas permanen. Domain tersebut digunakan untuk fase preview dan beta karena Klub Fisika Indonesia adalah inisiator awal yang menyediakan infrastruktur dan sumber daya pertama. Namun **visi jangka panjangnya berbeda.**

### 10.2 Visi: Platform Milik Komunitas

KF13 dirancang sejak awal untuk menjadi lebih besar dari satu organisasi. Tujuan akhirnya adalah platform ini **tidak bergantung pada, dan tidak dikontrol oleh, satu entitas tunggal** — termasuk Klub Fisika Indonesia sendiri.

Yang diharapkan:

```
SEKARANG (Beta)                    MASA DEPAN (Komunitas)
─────────────────                  ─────────────────────────────
Inisiator: Klub Fisika             Governance: Multi-stakeholder
Domain: klubfisika.or.id           Domain: independen / netral
Maintainer: tim internal           Maintainer: komunitas terbuka
Funding: mandiri (unit usaha)      Funding: komunitas + institusi
Kontributor: terbatas              Kontributor: dari mana saja
```

### 10.3 Siapa yang Diharapkan Bergabung

Platform ini diharapkan menjadi milik bersama dari siapapun yang peduli pada ekosistem riset dan sains Indonesia:

| Siapa | Kontribusi yang Diharapkan |
|-------|---------------------------|
| **Engineer & developer** | Kontribusi kode, fitur, bugfix, infrastruktur |
| **Peneliti & akademisi** | Domain expertise, validasi standar indeksasi, review |
| **Guru & mentor** | Feedback pedagogi, UX untuk konteks sekolah |
| **Organisasi sains** | Co-governance, endorsement, koneksi ke komunitas nyata |
| **Institusi pendidikan** | Adopsi, integrasi, feedback dari ground level |
| **Inisiator independen** | Bisa fork, bisa extend, bisa deploy untuk komunitas mereka |

### 10.4 Bagaimana Ini Bisa Terjadi

Realitasnya, untuk sampai ke titik "milik komunitas" dibutuhkan:

1. **Platform yang terbukti bekerja** — produk harus solid dulu sebelum bisa diadopsi luas
2. **Komunitas kontributor yang terbentuk** — open-source hanya bermakna jika ada yang berkontribusi
3. **Funding yang cukup** — baik dari komunitas, donasi, grant, maupun institusi yang percaya pada visi ini
4. **Governance yang jelas** — aturan main tentang siapa yang bisa mempengaruhi arah platform

Klub Fisika Indonesia berkomitmen untuk:
- Menjaga kode tetap **open-source (MIT)** tanpa syarat
- **Tidak mengunci** platform ke infrastruktur atau layanan proprietary
- Mendokumentasikan semua keputusan teknis dan arsitektur secara terbuka
- **Menyambut kontributor** dari luar Klub Fisika dengan setara

### 10.5 Untuk Kontributor dari Luar Klub Fisika

Jika Anda adalah engineer, peneliti, organisasi, atau institusi yang tertarik berkontribusi atau berkolaborasi:

- **Kode**: Fork repo ini, buat PR — kontribusi disambut tanpa syarat afiliasi
- **IDE & Masukan**: Buka issue di GitHub, diskusi terbuka
- **Kolaborasi institusional**: Hubungi tim via GitHub Discussions atau kontak yang tersedia
- **Adopsi & deployment**: Semua kode di bawah MIT — bebas digunakan, dimodifikasi, dan di-deploy

> Platform ini dibangun bukan untuk menjadi produk Klub Fisika.
> Ia dibangun untuk menjadi infrastruktur bersama ekosistem riset Indonesia.

---

## 11. Visi Akhir

KF13 bukan sekadar platform teknologi. Ia adalah **ekosistem kredibilitas** yang memberi jawaban atas pertanyaan yang selama ini tidak punya jawaban:

> *"Saya pernah meneliti ini waktu SMA. Saya menang lomba KIR nasional. Saya membimbing 12 siswa yang penelitiannya berhasil dipresentasikan. Bagaimana dunia tahu bahwa itu nyata, bermakna, dan bisa saya andalkan untuk masa depan saya?"*

Dengan KF13, jawaban itu ada:
- **Karya terverifikasi** — bukan sekadar klaim, tapi rekam jejak yang bisa dicek
- **Profil terpadu** — siapa kamu dan apa karyamu dalam satu tempat
- **Jejaring yang bermakna** — dibangun dari kontribusi nyata, bukan dari follower count
- **Portofolio yang bisa dipakai** — untuk beasiswa, seleksi kuliah, karir riset

Infrastruktur kredibilitas ini yang selama ini tidak ada untuk peneliti muda Indonesia. KF13 membangunnya — open-source, non-profit, untuk semua.

---

<p align="center">
  <sub>
    Bagian dari <a href="https://github.com/klubfisika/community">KF13 Community Platform</a>
    ·
    Diinisiasi oleh <a href="https://klubfisika.github.io">Klub Fisika Indonesia</a>
    <br>
    Lihat juga: <a href="docs/DATABASE_SCHEMA.md">Database Schema</a>
    ·
    <a href="docs/TECH_DECISION.md">Tech Decision</a>
    ·
    <a href="SINTA_RESEARCH.md">SINTA Research</a>
    ·
    <a href="AGENTS.md">Panduan Kontributor</a>
  </sub>
</p>
