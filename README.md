# Beamitpal |  Personal Portfolio (Next.js)

Beamitpal is a personal portfolio website built with Next.js and a modern React stack. It showcases projects, professional experience, certifications, and includes a contact form powered by Web3Forms.

This repository contains the frontend code for the portfolio site and is intended as a showcase of design, interactive components, and content.

## Highlights

- Clean, responsive UI built with shadcn-style components
- Contact form using Web3Forms API for email submissions
- Client-side validation with Zod and React Hook Form
- Toast notifications via Sonner
- Prisma client generated for data models (if used)

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn-style UI components (under `components/ui/`)
- Zod + react-hook-form for validation
- Sonner for toast notifications

## Quick demo

After starting the dev server, open http://localhost:3000

## Getting started (local development)

1. Install dependencies

```bash
pnpm install
```

2. Create a local environment file

Create a `.env.local` at the repository root and add the following (replace with your real values):

```env
NEXT_PUBLIC_DMCA_URL=https://www.dmca.com/your_dmca
NEXT_PUBLIC_WEB_3_API=your_web3forms_access_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="file:./dev.db" # optional, for Prisma local development
DIRECT_URL="file:./dev.db" # optional, for Prisma local development
```

3. Run the dev server

```bash
pnpm dev
```

## Contact form

- File: `features/profile/contact/form.tsx`
- The contact form uses `react-hook-form` + `zod` for validation and posts to the Web3Forms API endpoint.
- Ensure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set before testing the form.
- Toast notifications are provided by Sonner. The project has a `Toaster` component under `components/ui/sonner.tsx` ??? ensure it's mounted in your app layout (it typically is in this repo).

## Useful scripts

- `pnpm dev` ??? run development server
- `pnpm build` ??? build for production
- `pnpm start` ??? start production server
- `pnpm generate` ??? run Prisma generate (if working with Prisma)

## Notes and troubleshooting

- If you see type errors between `zod` and `@hookform/resolvers`, verify compatible versions in `package.json`.
- Do not commit secrets to the repository. Store keys in environment variables (`.env.local`) or your hosting provider's secret manager.

## Deployment

This project deploys easily to Vercel. Add the same environment variables to your Vercel project settings and Vercel will handle the build and deployment.

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a concise description of the change. Prefer small, focused PRs.

## License & Attribution

This repository is provided for portfolio/demo purposes. Use or adapt the code as you like ??? include attribution if you reuse substantial parts.

## Contact

Use the site's contact form or the contact links in the portfolio to reach out about collaborations or questions.
