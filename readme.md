# Gharbeti

**Rental property management for landlords and tenants in Nepal.**

Gharbeti connects landlords and tenants in one place — invite tenants, track rent & dues, manage maintenance, share notices, and handle digital lease rules. Built as a full-stack product with a marketing site, a React Native mobile app, and a Node.js API.

---

## What's inside

| Package | Path | What it is |
| --- | --- | --- |
| **Mobile app** | [`mobile-app/`](./mobile-app) | Expo / React Native app for landlords & tenants (iOS & Android) |
| **Backend API** | [`gharbeti-backend/`](./gharbeti-backend) | Express + MongoDB REST API with JWT auth & Swagger docs |
| **Web** | [`gharbeti-web/`](./gharbeti-web) | Next.js marketing / landing site |

```
gharbeti/
├── mobile-app/          # Expo React Native (landlord + tenant)
├── gharbeti-backend/    # Node.js + Express + MongoDB API
├── gharbeti-web/        # Next.js landing page
└── readme.md
```

---

## Features

### For landlords
- Register, verify email (OTP), and sign in (including biometric on mobile)
- Invite tenants with invitation codes
- Define house rules / lease agreement points tenants must accept
- Track tenants, rooms, and outstanding dues
- Record & verify rent payments
- Create notices / announcements
- Handle maintenance requests and chat with tenants

### For tenants
- Onboard via invitation code
- View lease terms, rent, and payment history
- Submit maintenance requests
- Receive notices and notifications
- Pay rent via local methods (e.g. eSewa, Khalti, Fonepay, ConnectIPS)

### Platform
- Role-based access (landlord / tenant)
- JWT authentication
- Push-ready notification & messaging APIs
- Interactive Swagger API docs

---

## Tech stack

| Layer | Stack |
| --- | --- |
| **Mobile** | Expo 54, React Native, React Navigation, TanStack Query, NativeWind, Axios |
| **Backend** | Node.js, Express, MongoDB (Mongoose), JWT, Nodemailer, Swagger |
| **Web** | Next.js 15, React 19, Tailwind CSS, Lucide icons |

---

## Prerequisites

- **Node.js** 18+ (see `.nvmrc` if present)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- For mobile: **Expo CLI**, iOS Simulator / Android emulator (or a physical device)

---

## Quick start

Clone the monorepo, then set up each package you need.

```bash
git clone https://github.com/rbdiwash/gharbeti.git
cd gharbeti
```

### 1. Backend API

```bash
cd gharbeti-backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Email (OTP / verification) — required for landlord registration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Start the API:

```bash
npm run dev    # nodemon
# or
npm start      # production
```

- API base: `http://localhost:8000/api`
- Swagger UI: `http://localhost:8000/api-docs`

> Point the mobile app’s `BASE_URL` in `mobile-app/api/api-client.js` at your machine’s LAN IP (e.g. `http://192.168.x.x:8000/api/`) when testing on a device.

### 2. Mobile app

```bash
cd mobile-app
yarn install   # or npm install
yarn start     # expo start
```

Then press `i` (iOS), `a` (Android), or scan the QR code with Expo Go / a dev client.

Useful scripts:

| Command | Description |
| --- | --- |
| `yarn start` | Start Expo Metro bundler |
| `yarn ios` | Build & run on iOS |
| `yarn android` | Build & run on Android |

**App structure (high level):**

```
mobile-app/
├── App.js                 # Entry
├── Screens/
│   ├── auth/              # Login, signup, OTP, tenant onboarding
│   └── screens/
│       ├── Landlord/      # Home, tenants, dues, notices, lease, etc.
│       └── Tenant/        # Home, payments, maintenance, profile
├── Stack/                 # Auth / Landlord / Tenant navigators
├── api/                   # Axios API modules
├── hooks/                 # React Query hooks
├── context/               # Auth & app state
└── components/            # Shared UI
```

### 3. Web (landing)

```bash
cd gharbeti-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐
│  Mobile (Expo)  │     │  Web (Next.js)  │
│  Landlord/Tenant│     │  Marketing site │
└────────┬────────┘     └────────┬────────┘
         │  REST / JWT           │
         └──────────┬────────────┘
                    ▼
         ┌─────────────────────┐
         │  gharbeti-backend   │
         │  Express + MongoDB  │
         └─────────────────────┘
```

### Main API surfaces

| Prefix | Purpose |
| --- | --- |
| `/api/auth` | Register, login, OTP, invitations, password reset |
| `/api/tenants` | Tenant CRUD & landlord ↔ tenant links |
| `/api/lease-agreements` | House rules / lease points |
| `/api/payments` | Dues, history, verification |
| `/api/maintenance` | Maintenance requests |
| `/api/notices` | Announcements |
| `/api/notifications` | In-app notifications |
| `/api/messages` | Landlord ↔ tenant chat |
| `/api/properties` | Property records |
| `/api/profile` | User profile |
| `/api/buzz` | Landlord buzz / extras |

Full interactive docs: **`/api-docs`** when the backend is running.

---

## Environment & config tips

| Concern | Where |
| --- | --- |
| API URL (mobile) | `mobile-app/api/api-client.js` → `BASE_URL` |
| Backend secrets | `gharbeti-backend/.env` (never commit) |
| Expo / EAS | `mobile-app/app.json`, `mobile-app/eas.json` |
| Bundle IDs | `com.rbdiwash.Gharbeti` (iOS & Android) |

---

## Development workflow

1. Start **MongoDB** and the **backend** (`gharbeti-backend`).
2. Point the mobile `BASE_URL` at your machine.
3. Run **Expo** from `mobile-app`.
4. Optionally run **Next.js** from `gharbeti-web` for the landing page.

Landlord registration requires a working email SMTP config so OTP verification can complete.

---

## Contributing

1. Create a branch from `main`
2. Keep changes scoped (mobile / backend / web)
3. Test against a local or staging API
4. Open a pull request with a short summary and test notes

---

## License

Private / ISC — see package licenses in each subdirectory.

---

<p align="center">
  <strong>Gharbeti</strong> — simpler renting for landlords & tenants.
</p>
