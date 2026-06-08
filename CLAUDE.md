# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Facturacion** is a React-based invoice management and billing system. It's a single-page application that allows users to manage invoices, export data, and handle multi-company operations.

**Tech Stack:**
- Frontend: React 19 with TypeScript
- Build tool: Vite 7
- Styling: Tailwind CSS
- Routing: React Router v7
- Data fetching: Axios with React Query (TanStack Query)
- UI Icons: Lucide React

## Architecture

### Directory Structure
```
src/
├── assets/           # Static images and files
├── components/       # Reusable UI components
│   ├── Button/
│   ├── Factura/      # Invoice-related components
│   ├── Input/
│   ├── Layout/       # Page layout wrapper
│   ├── Modal/        # Modal dialog with context
│   ├── RoutersWithNotFound/  # Router wrapper with 404 handling
│   └── Sidebar/      # Navigation sidebar
├── context/          # React Context (auth state)
├── guard/            # Route guards (PrivateGuard)
├── hooks/            # Custom React hooks
├── models/           # TypeScript interfaces and types
├── pages/
│   ├── public/       # LoginPage, NotFound
│   └── private/      # DashboardPage, Facturas, QuickStart
└── services/         # API communication (axios)
```

### Key Architectural Patterns

**Authentication & Context:**
- `AuthContext` (context/auth.context.ts) provides authentication state globally
- `AuthProvider` (context/auth.context.provider.tsx) manages login, signup, logout, and user state
- `PrivateGuard` (guard/PrivateGuard.tsx) protects routes that require authentication
- Includes multi-company support: users can have multiple companies and switch between them

**Data Fetching:**
- Uses React Query (`@tanstack/react-query`) for server state management
- API calls are wrapped in custom hooks (e.g., `useFacturas`, `useLogin`, `useDownloadFactura`)
- Backend API: `https://facturacion.server.coorporativo.live/api`
- All API requests include credentials (`withCredentials: true`)

**Routing:**
- Routes defined in models/routes.models.ts
- Public routes: `/login`
- Private routes: `/private/*` (all require authentication)
- Root `/` redirects to private dashboard

**UI Patterns:**
- Modal system uses context for global modal management
- Reusable components follow single-responsibility principle
- Tailwind CSS for styling (no CSS modules or other CSS-in-JS libraries)

## Common Commands

```bash
# Start development server (HMR enabled)
npm run dev

# Type-check and build for production
npm run build

# Lint code with ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Development Workflow

**Starting the App:**
```bash
npm run dev
```
The app runs at `http://localhost:5173` by default and connects to the production API.

**Making API Changes:**
- API calls are in `src/services/api.service.ts`
- API URL is hardcoded; to test locally, uncomment the local URL and comment the production one
- Hooks wrap API calls and handle caching and refetching via React Query

**Adding New Pages:**
1. Create folder in `src/pages/private/` or `src/pages/public/`
2. Define route in models/routes.models.ts
3. Add Route in AppRouter.tsx or PrivateRouter.tsx

**Adding New Components:**
- Place in `src/components/[ComponentName]/`
- Use TypeScript for prop types
- Import icons from `lucide-react` if needed

**Working with Authentication:**
- Use the `useAuthContext()` hook to access auth state
- `signIn()` handles login logic, including multi-company selection
- `signUp()` registers new users
- `logOut()` clears auth state

## Testing and Validation

The project currently has no test suite. If adding tests:
- Consider Vitest (Vite-native) for unit tests
- Use React Testing Library for component tests
- No test infrastructure is currently in place

## Type Safety

- Full TypeScript with strict mode enabled (tsconfig.app.json)
- Models defined in `src/models/`
- API responses are typed in service files
- Component props are typed with TypeScript interfaces

## Build & Deployment

- `npm run build` compiles TypeScript and bundles with Vite
- Output is in `dist/` folder
- Production API URL is hardcoded in api.service.ts

## Notes

- The auth provider includes a commented-out debug comment about authentication logic (line 24 in auth.context.provider.tsx) — this is intentional and may indicate prior confusion about auth state flow
- Excel and PDF exports are handled via blob downloads in the backend
- The app supports filtering invoices by status/method and searching
