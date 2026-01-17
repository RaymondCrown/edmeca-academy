# EDMECA - From Framework to Execution to Evidence

A modern web application for entrepreneurs and enterprise development programmes, combining MBA-level business frameworks with AI-enabled tools.

## Features

### Marketing Website
- Professional landing page with clear value proposition
- Solutions pages for Entrepreneurs and Programmes
- Frameworks overview and tooling preview
- Engagement options and pricing
- Contact and insights pages

### Authenticated Portal
- Role-based access control (Entrepreneur, Participant, Programme Manager, Admin)
- AI-enabled business tools:
  - Business Model Canvas Builder
  - SWOT + PESTLE Analysis
  - Value Proposition Builder
  - Pitch Deck Builder
  - Progress Tracker
- Multi-tenant organization and cohort management
- M&E reporting and analytics
- PDF/DOCX export functionality

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js v5
- **AI**: Anthropic Claude API
- **Email**: Resend/SendGrid
- **Storage**: S3-compatible (Cloudflare R2/AWS S3)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Anthropic API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd edmeca-academy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
- `ANTHROPIC_API_KEY`: Your Anthropic API key

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
/
├── app/
│   ├── (marketing)/       # Public marketing pages
│   ├── (auth)/           # Authentication pages
│   ├── portal/           # Authenticated portal
│   └── api/             # API routes
├── components/
│   ├── marketing/       # Marketing components
│   ├── portal/         # Portal components
│   ├── tools/         # Tool components
│   └── ui/           # shadcn/ui components
├── lib/
│   ├── auth.ts      # NextAuth configuration
│   ├── db.ts       # Prisma client
│   ├── ai.ts      # Claude API integration
│   └── export.ts # Export utilities
├── prisma/
│   └── schema.prisma  # Database schema
└── public/          # Static files
```

## Database Schema

The application uses a multi-tenant architecture with:
- **User**: Authentication and profile
- **Organisation**: Top-level tenant
- **Cohort**: Programme cohorts within organisations
- **Artifact**: User-generated business artifacts (BMC, SWOT, etc.)
- **ProgressEntry**: Milestone tracking and evidence

## Development

### Running Prisma Studio
```bash
npx prisma studio
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Deployment

The app is configured for deployment on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

MIT

## Support

For questions or support, contact hello@edmeca.com
