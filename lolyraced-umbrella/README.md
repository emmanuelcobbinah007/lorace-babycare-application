# Lolyraced Umbrella Company

This is the standalone umbrella company application for Lolyraced Ventures. It contains the main company homepage and admin dashboard.

## Features

- 🏢 Umbrella company homepage showcasing all businesses
- 🔐 Shared authentication system across all businesses
- 👤 Role-based access control (Admin/User)
- 📱 Fully responsive design
- 🌐 Environment-based domain switching
- 🎨 Modern UI with smooth animations

## Environment Configuration

This project supports environment-based domain switching to facilitate development and production deployments.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Environment configuration for business domain switching
# Set to 'development' for local URLs, 'production' for live domains
NEXT_PUBLIC_ENVIRONMENT=development

# Local development port (used when NEXT_PUBLIC_ENVIRONMENT=development)
NEXT_PUBLIC_DEV_PORT=3000

# Local development host (used when NEXT_PUBLIC_ENVIRONMENT=development)
NEXT_PUBLIC_DEV_HOST=localhost
```

### How It Works

- **Development Mode**: When `NEXT_PUBLIC_ENVIRONMENT=development`, business links point to local development URLs (e.g., `http://localhost:3000` for Lorace Babycare)
- **Production Mode**: When `NEXT_PUBLIC_ENVIRONMENT=production` (or unset), business links point to live domains (e.g., `https://loracebabycare.lolyraced.com`)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Key Pages

- `/` - Redirects to umbrella page
- `/umbrella` - Main umbrella company homepage
- `/admin/dashboard` - Admin dashboard (requires admin role)

## Authentication

The app includes a shared authentication system:

- Sign up/Sign in modal with smooth animations
- Role-based access control
- Persistent authentication state
- Admin dashboard for administrators

## Deployment

This is designed to be deployed as a separate Vercel project for the main umbrella company domain.

### Vercel Deployment

1. Push this folder to its own GitHub repository
2. Connect to Vercel
3. Set environment variable: `NEXT_PUBLIC_ENVIRONMENT=production`
4. Deploy

### Domain Configuration

When you get your `lolyraced.com` domain:
- Point the main domain to this umbrella app
- Configure subdomains to point to individual business apps

## Project Structure

- `src/app/umbrella/` - Umbrella company homepage
- `src/contexts/AuthContext.tsx` - Global authentication state
- `src/app/components/ui/` - Reusable UI components
- `src/config/` - Business configurations and utilities
- `src/app/admin/` - Admin dashboard pages

## Business Configuration

Business configurations are in `src/config/index.ts`. Update this file to add new businesses or modify existing ones.

## Notes

This is a standalone version extracted from the monorepo structure. It contains all necessary components and configurations to run independently.
