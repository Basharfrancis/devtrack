# DevTrack

> **Developer Productivity & Activity Tracker**
>
> _Track commits, pull‑requests and issue activity across GitHub & Jira, surface actionable metrics for individuals and teams, and expose everything through a clean REST API._

---

## ✨ Key Features

| Feature                        | Status | Notes                                        |
| ------------------------------ | ------ | -------------------------------------------- |
| **GitHub activity ingestion**  | ✅     | Commits, PRs & reviews via REST API          |
| **Jira issue ingestion**       | ⬜     | Planned – configure via OAuth 2.0            |
| **PostgreSQL data store**      | ✅     | Prisma ORM schemas in `/prisma`              |
| **Redis caching & rate‑limit** | ⬜     | Caches GitHub responses + job locking        |
| **REST API (Express/Fastify)** | ✅     | `/api/github/…` routes documented in Swagger |
| **Background jobs / Cron**     | ⬜     | Runs hourly via BullMQ or custom worker      |
| **AWS deployment**             | ⬜     | Terraform recipes for ECS & RDS              |
| **React dashboard (optional)** | ⬜     | Front‑end for graphs & reporting             |

---

## 🏗️ Tech Stack

- **Node.js / TypeScript** – core runtime & language
- **Express** – lightweight HTTP server (Fastify optional)
- **PostgreSQL** – relational database (managed on RDS when deployed)
- **Prisma ORM** – type‑safe DB layer & migrations
- **Redis** – caching + distributed locks
- **GitHub / Jira APIs** – data sources
- **Docker** – local dev & CI containers
- **Terraform** – IaC for AWS (ECS, RDS, ElastiCache)
- **GitHub Actions** – CI / CD pipeline

---

## 🖼️ Architecture (high‑level)

```
┌────────────┐    cron    ┌──────────────┐
│            │  ───────▶ │              │
│   Worker   │  fetches  │   GitHub /   │
│  (BullMQ)  │           │    Jira      │
└────────────┘           └──────────────┘
     │  writes                       ▲
     ▼                               │ REST
┌────────────┐   Prisma   ┌──────────┴─────────┐
│   Postgres │ ◀────────▶ │   API Server       │
└────────────┘            │  Express/Fastify   │
     ▲                    └──────────┬─────────┘
     │                               │ JSON
     │                               ▼
┌────────────┐                ┌──────────────┐
│   Redis    │ ◀───────────── │  React UI    │
└────────────┘    cache       └──────────────┘
```

---

## 🚀 Getting Started (Local)

### Prerequisites

- Node.js ≥ 18.x
- Docker (for Postgres & Redis)
- GitHub personal access token (classic, `repo` scope)

### 1. Clone & Install

```bash
git clone https://github.com/<your‑handle>/devtrack.git
cd devtrack
npm install
```

### 2. Create `.env`

```
# Application
PORT=3000
NODE_ENV=development

# GitHub
GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXX

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/devtrack

# Redis
REDIS_URL=redis://localhost:6379
```

### 3. Start Postgres & Redis via Docker (optional)

```bash
docker compose up -d
```

> `docker-compose.yml` is included for convenience.

### 4. Generate & Apply Prisma migrations

```bash
npx prisma migrate dev --name init
```

### 5. Run Dev Server

```bash
npm run dev   # ts-node-dev watches + reloads
```

Open [http://localhost:3000/api/github/commits](http://localhost:3000/api/github/commits) to test.

---

## 🧪 Scripts

| Command         | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Start dev server with hot‑reload |
| `npm run start` | Start compiled server (`dist`)   |
| `npm run build` | Compile TypeScript to `dist/`    |
| `npm run test`  | Jest unit tests                  |
| `npm run lint`  | ESLint + Prettier                |

---

## 📂 Project Structure

```
└── src/
    ├── index.ts          # entrypoint
    ├── routes/           # Express routers
    ├── services/         # business logic (GitHub, Jira, etc.)
    ├── jobs/             # BullMQ workers / cron scripts
    ├── utils/            # helpers & shared code
    └── config/           # env parsing, logger, etc.
```

---

## 🗺️ Roadmap (v0.1 → v1.0)

1. **Finish GitHub ingestion** – store commits & PRs in Postgres
2. Add **Redis caching** + job locking
3. Build **/api/reports** endpoint (daily/weekly stats)
4. Add **Swagger / OpenAPI** docs
5. **Jira integration** (OAuth)
6. Deploy to **AWS** with Terraform (ECS + RDS + ElastiCache)
7. Optional **React Dashboard** with charts

Track tasks in the GitHub **Projects** board.

---

## 🤝 Contributing

1. Fork the repo & create your feature branch (`git checkout -b feature/myFeature`).
2. Commit your changes (`git commit -m "feat: add my feature"`).
3. Push to the branch (`git push origin feature/myFeature`).
4. Open a Pull Request.

To discuss large changes, open an issue first.

---

## 📄 License

MIT © 2025 Bashar Fransis
