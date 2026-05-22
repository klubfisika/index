# Database Schema — KF13 Research Index

> Desain lengkap database PostgreSQL untuk platform arsip dan indeksasi riset K-12.
> Diimplementasikan menggunakan Drizzle ORM.

---

## Gambaran Umum

Schema ini mendukung: indeksasi karya ilmiah, verifikasi bertingkat, sitasi & referensi, portofolio peneliti, dan integrasi dengan Platform sosial.

### 18 Tabel

| # | Tabel | Deskripsi |
|---|---|---|
| 1 | users | Akun pengguna (Better Auth auto-generate) |
| 2 | profiles | Data profil tambahan (1:1 users) |
| 3 | institutions | Sekolah, universitas, lembaga |
| 4 | research_works | **Tabel inti** — semua karya ilmiah |
| 5 | authors | Relasi many-to-many karya ↔ penulis |
| 6 | categories | Kategori riset |
| 7 | work_categories | Relasi karya ↔ kategori |
| 8 | tags | Tag/keyword |
| 9 | work_tags | Relasi karya ↔ tag |
| 10 | verifications | Riwayat verifikasi bertingkat |
| 11 | citations | Relasi sitasi antar karya |
| 12 | reviews | Peer review dan penilaian |
| 13 | competitions | Kompetisi/lomba sains |
| 14 | work_competitions | Relasi karya ↔ prestasi lomba |
| 15 | mentorships | Relasi mentor ↔ mentee |
| 16 | files | File upload terkait karya |
| 17 | work_likes | Cendol/apresiasi untuk karya |
| 18 | audit_logs | Log aktivitas untuk audit |

---

## Entity Relationship Diagram

```
users ──▶ profiles (1:1)
users ──▶ authors (many-to-many dengan research_works)
users ──▶ verifications (sebagai verifikator)
users ──▶ reviews (sebagai reviewer)
users ──▶ mentorships (sebagai mentor & mentee)

research_works ──▶ authors (siapa penulis)
research_works ──▶ work_categories (kategori)
research_works ──▶ work_tags (tag)
research_works ──▶ verifications (status verifikasi)
research_works ──▶ citations (source & target)
research_works ──▶ reviews (peer review)
research_works ──▶ files (dokumen)
research_works ──▶ work_likes (apresiasi)
research_works ──▶ work_competitions (prestasi lomba)

institutions ──▶ profiles
categories ──▶ work_categories
tags ──▶ work_tags
competitions ──▶ work_competitions
```

---

## Tabel Detail

### 1. users — Better Auth Auto-Generate

⚠️ Auto-generated. Jangan diedit manual. Kolom: id, name, email, emailVerified, image, createdAt, updatedAt.

### 2. profiles — Data Profil Tambahan (1:1 users)

```sql
CREATE TABLE profiles (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  username        TEXT UNIQUE,
  bio             TEXT,
  avatar_url      TEXT,
  institution_id  INTEGER REFERENCES institutions(id),
  level           TEXT DEFAULT 'SMA',    -- SD|SMP|SMA|SMK|D3|S1|S2|S3
  major           TEXT,
  year            TEXT,
  phone           TEXT,
  website         TEXT,
  language        TEXT DEFAULT 'id',
  visibility      TEXT DEFAULT 'public',
  works_count     INTEGER DEFAULT 0,
  citations_count INTEGER DEFAULT 0,
  cendol_count    INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. institutions — Institusi Pendidikan

```sql
CREATE TABLE institutions (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  short_name  TEXT,
  type        TEXT NOT NULL,  -- SD|SMP|SMA|SMK|UNIVERSITAS|POLITEKNIK|LEMBAGA
  city        TEXT,
  province    TEXT,
  country     TEXT DEFAULT 'Indonesia',
  website     TEXT,
  logo_url    TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_by  INTEGER REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. research_works — TABEL INTI

```sql
CREATE TABLE research_works (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  abstract        TEXT NOT NULL,
  content_text    TEXT,
  type            TEXT NOT NULL DEFAULT 'paper',
  language        TEXT DEFAULT 'id',
  status          TEXT NOT NULL DEFAULT 'draft',
  visibility      TEXT DEFAULT 'public',
  field           TEXT,
  subfield        TEXT,
  keywords        TEXT,
  doi             TEXT UNIQUE,
  education_level TEXT DEFAULT 'SMA',
  file_url        TEXT,
  file_size       INTEGER,
  file_type       TEXT,
  thumbnail_url   TEXT,
  view_count      INTEGER DEFAULT 0,
  citation_count  INTEGER DEFAULT 0,
  like_count      INTEGER DEFAULT 0,
  research_date   DATE,
  published_at    TIMESTAMPTZ,
  owner_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**Status Lifecycle**: draft → submitted → under_review → verified → published (atau rejected → resubmit)

**Tipe Karya**: paper, report, poster, experiment, project, tutorial

### 5. authors — Relasi Penulis

```sql
CREATE TABLE authors (
  id          SERIAL PRIMARY KEY,
  work_id     INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'author',
  position    INTEGER NOT NULL DEFAULT 1,
  affiliation TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(work_id, user_id)
);
```

### 6-7. categories + work_categories

```sql
CREATE TABLE categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon        TEXT,
  parent_id   INTEGER REFERENCES categories(id),
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE work_categories (
  work_id     INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary  BOOLEAN DEFAULT false,
  PRIMARY KEY (work_id, category_id)
);
```

**Seed categories**: Fisika ⚛️, Biologi 🧬, Kimia ⚗️, Matematika 📐, Komputer 💻, Teknik ⚙️, Astronomi 🌌, Lingkungan 🌱, Sosial-Humaniora 📖, Lainnya 📦

### 8-9. tags + work_tags

```sql
CREATE TABLE tags (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  usage_count INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE work_tags (
  work_id INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  tag_id  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (work_id, tag_id)
);
```

### 10. verifications — Verifikasi Bertingkat

```sql
CREATE TABLE verifications (
  id               SERIAL PRIMARY KEY,
  work_id          INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  verifier_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  verifier_role    TEXT NOT NULL,
  level            INTEGER NOT NULL DEFAULT 1,
  status           TEXT NOT NULL DEFAULT 'pending',
  notes            TEXT,
  rejection_reason TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(work_id, verifier_id, level)
);
```

**5 Level Verifikasi**: 1=Self-submit, 2=Mentor/Guru, 3=Peer, 4=Institution Admin, 5=Platform Admin

### 11. citations — Sitasi

```sql
CREATE TABLE citations (
  id              SERIAL PRIMARY KEY,
  source_work_id  INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  target_work_id  INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  context         TEXT,
  page_number     INTEGER,
  created_by      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_work_id, target_work_id)
);
```

### 12. reviews — Peer Review

```sql
CREATE TABLE reviews (
  id          SERIAL PRIMARY KEY,
  work_id     INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  reviewer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating      INTEGER CHECK (rating >= 1 AND rating <= 5),
  content     TEXT NOT NULL,
  is_public   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 13-14. competitions + work_competitions

```sql
CREATE TABLE competitions (
  id                  SERIAL PRIMARY KEY,
  name                TEXT NOT NULL,
  organizer           TEXT,
  level               TEXT,
  category            TEXT,
  year                INTEGER,
  description         TEXT,
  website             TEXT,
  registration_start  DATE,
  registration_end    DATE,
  event_start         DATE,
  event_end           DATE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE work_competitions (
  id              SERIAL PRIMARY KEY,
  work_id         INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  competition_id  INTEGER NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  achievement     TEXT,
  rank            INTEGER,
  certificate_url TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(work_id, competition_id)
);
```

### 15. mentorships

```sql
CREATE TABLE mentorships (
  id          SERIAL PRIMARY KEY,
  mentor_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mentee_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'pending',
  focus_area  TEXT,
  notes       TEXT,
  started_at  TIMESTAMPTZ,
  ended_at    TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mentor_id, mentee_id)
);
```

### 16. files

```sql
CREATE TABLE files (
  id          SERIAL PRIMARY KEY,
  work_id     INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  uploaded_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename    TEXT NOT NULL,
  storage_key TEXT NOT NULL UNIQUE,
  mime_type   TEXT NOT NULL,
  size_bytes  INTEGER NOT NULL,
  file_type   TEXT DEFAULT 'document',
  status      TEXT DEFAULT 'uploaded',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 17. work_likes

```sql
CREATE TABLE work_likes (
  user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  work_id   INTEGER NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  type      TEXT NOT NULL DEFAULT 'cendol',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, work_id)
);
```

### 18. audit_logs

```sql
CREATE TABLE audit_logs (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id   INTEGER,
  old_data    JSONB,
  new_data    JSONB,
  ip_address  TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Indeks & Optimasi

### Full-Text Search (Bahasa Indonesia)

```sql
CREATE INDEX idx_works_search ON research_works
  USING gin(to_tsvector('indonesian', title || ' ' || abstract || ' ' || COALESCE(keywords, '')));
```

### Composite Indexes

```sql
CREATE INDEX idx_works_discover ON research_works(status, field, published_at DESC) WHERE status = 'verified';
CREATE INDEX idx_works_user_recent ON research_works(owner_id, created_at DESC);
CREATE INDEX idx_authors_work ON authors(work_id);
CREATE INDEX idx_authors_user ON authors(user_id);
CREATE INDEX idx_verifications_work ON verifications(work_id);
CREATE INDEX idx_citations_source ON citations(source_work_id);
CREATE INDEX idx_citations_target ON citations(target_work_id);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_work_likes_work ON work_likes(work_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

### Cache Strategy

Kolom agregat di-cache via trigger/job periodik:

| Tabel | Kolom | Sumber |
|---|---|---|
| research_works | citation_count | COUNT(citations) WHERE target_work_id |
| research_works | like_count | COUNT(work_likes) WHERE work_id |
| profiles | works_count | COUNT(research_works) WHERE owner_id |
| profiles | citations_count | SUM(citation_count) across works |
| tags | usage_count | COUNT(work_tags) WHERE tag_id |

---

## Drizzle Implementation

```typescript
// src/lib/server/db/schema.ts
export { users, sessions, accounts } from './auth.schema';
export { profiles, profilesRelations } from './tables/profiles';
export { institutions } from './tables/institutions';
export { researchWorks, researchWorksRelations } from './tables/research_works';
export { authors } from './tables/authors';
export { categories, workCategories } from './tables/categories';
export { tags, workTags } from './tables/tags';
export { verifications } from './tables/verifications';
export { citations } from './tables/citations';
export { reviews } from './tables/reviews';
export { competitions, workCompetitions } from './tables/competitions';
export { mentorships } from './tables/mentorships';
export { files } from './tables/files';
export { workLikes } from './tables/work_likes';
export { auditLogs } from './tables/audit_logs';
```

---

## Migration Strategy

| Fase | Tabel | Deskripsi |
|---|---|---|
| 1 (MVP) | users, profiles, institutions, research_works, authors, categories, work_categories, tags, work_tags, files | Core indexing |
| 2 | verifications, reviews, citations, work_likes | Quality & credibility |
| 3 | competitions, work_competitions, mentorships, audit_logs | Ecosystem |

### Perintah

```bash
bun run db:generate   # Generate migration
bun run db:push       # Push langsung (dev)
bun run db:migrate    # Migrate (production)
```

---

## Integrasi Platform

### Shared Users
Index (Better Auth) → SSO provider. Cookie domain .klubfisika.or.id.

### Event-Driven Sync
Karya baru → auto-post ke feed Platform. Verifikasi → update badge Platform. Cendol Platform → sync ke work_likes Index.

---

<p align="center">
  <sub>Bagian dari KF13 Community Platform · Diinisiasi oleh Klub Fisika Indonesia</sub>
</p>
