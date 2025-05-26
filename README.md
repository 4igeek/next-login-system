# Next.js Login System

A modern authentication system built with Next.js, featuring email verification, secure password handling, and a beautiful UI using shadcn/ui components.

## Features

- 🔐 Secure authentication with NextAuth.js
- ✉️ Email verification using SendGrid
- 🎨 Modern UI with shadcn/ui and Tailwind CSS
- 🔒 Password hashing with bcryptjs
- 📱 Responsive design
- 🌙 Dark mode support
- 🛡️ TypeScript for type safety

## Prerequisites

- Node.js 18+ or Bun
- MongoDB database
- SendGrid account (for email verification)

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd next-login-system
```

2. Install dependencies using Bun:
```bash
bun install
```

3. Set up your environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
SENDGRID_API_KEY=your_sendgrid_api_key
```

4. Run the development server:
```bash
bun dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `bun dev` - Start the development server with Turbopack
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── app/          # Next.js app directory (pages and layouts)
├── components/   # Reusable UI components
├── lib/          # Utility functions and configurations
├── types/        # TypeScript type definitions
└── middleware.ts # Next.js middleware for route protection
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database
- [SendGrid](https://sendgrid.com/) - Email service
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
