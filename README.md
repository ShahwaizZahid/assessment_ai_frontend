# MVP Assessment AI Frontend

TypeScript + Vite frontend with the same baseline architecture style used in `HRIS_frontend`:
- centralized Axios API client with interceptors
- global session/server error events
- context-first provider composition
- Sonner global toaster
- shadcn base setup
- React Hook Form starter flow

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## Environment

- `VITE_API_BASE_URL`: API base URL (default fallback in code is `http://localhost:3000/api`)

## Project Structure

- `src/services/api.ts`: shared Axios instance, bearer token injection, 401/5xx event dispatching
- `src/services/authService.ts`: feature service example with normalized error messages
- `src/context/Auth/`: auth context/provider scaffold
- `src/context/AppProviders.tsx`: root provider composition entry
- `src/pages/LoginFormPage.tsx`: React Hook Form starter page with Sonner success/error toasts
- `components.json` + `src/lib/utils.ts`: shadcn base configuration and utility alias setup
# assessment_ai_frontend
