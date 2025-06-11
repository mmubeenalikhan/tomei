# tomei-test

A demo multi-step signup wizard: a Node/TypeScript/Express REST API backed by MySQL
(via Sequelize) and a Create React App frontend (TypeScript + Redux) that walks a user
through account creation. It's a small, self-contained test-task project meant to show
a typical wizard-style signup flow end to end, not a production service.

<!-- TODO: add a screenshot or short GIF of the wizard running here -->

## Tech stack

- **API**: Node.js, TypeScript, Express, Sequelize, MySQL
- **Web app**: React (Create React App), TypeScript, Redux + redux-thunk

## Quickstart

### Option A: Docker Compose (recommended)

Requires Docker and Docker Compose.

```bash
docker-compose up --build
```

This starts MySQL, runs the API's database migrations, and starts both the API and the
web app. Once it's up:

- Web app: http://localhost:3000
- API: http://localhost:3001

No manual MySQL setup is needed — the `mysql` service is seeded automatically and the
`api` service applies migrations on startup. Override the default local DB credentials
by copying `.env.example` to `.env` at the repo root and editing it.

### Option B: Run each project manually

Requires a local MySQL instance and Node.js.

**API** (from `api/`):

```bash
cp .env.example .env   # then edit DB_* vars to match your local MySQL
npm install
npx sequelize-cli db:migrate
npm run dev             # http://localhost:3001
```

**Web app** (from `web-app/`, in a separate terminal):

```bash
cp .env.example .env   # optional, defaults to http://localhost:3001
npm install
npm start                # http://localhost:3000
```

## Project structure

- `api/` — Express REST API. Routes are organized by resource under
  `api/src/v1/<resource>/` (router/middleware/controller); currently only
  `user-account` exists.
- `web-app/` — CRA frontend implementing the signup wizard UI and Redux state.

Each project is versioned and run independently; there's no shared root
package.json or workspace tooling outside of `docker-compose.yml` and CI.

## Known limitations / roadmap

This is a test-task project, not a finished product. Known gaps:

- **The wizard only implements step 1 of 5.** The frontend renders a 5-step progress
  bar, but the API only has a single `user-account` create endpoint — there's no
  update/patch endpoint or backend fields for personal info, employment details, or
  documents. Steps 2-5 have no backend support.
- **No authentication.** Accounts are created with a hashed password, but there's no
  login/session endpoint, so the hash currently isn't used for anything.
- **No service/repository layer in the API** — controllers call Sequelize models
  directly.
- **No centralized Express error-handling middleware** — each controller has its own
  try/catch.
- **Redux uses a folder-by-type layout** (`action-type/`, `action-generator/`,
  `actions-interface/`, `reducers/`) rather than feature/"ducks" folders.

## License

MIT — see [LICENSE](./LICENSE).
