# Full-Stack Authentication Application

A complete authentication system with a React frontend and Node.js backend, built with TypeScript and modern development practices.

## Project Overview

This project demonstrates a full-stack authentication system with the following features:

- User registration and login
- Protected routes
- Form validation with React Hook Form and Zod
- API handling with React Query
- Type-safe API interactions
- Error handling and user feedback

## Tech Stack

### Frontend

- React with TypeScript
- React Router for navigation
- React Hook Form for form management
- Zod for schema validation
- React Query for data fetching and caching
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js with Express
- TypeScript for type safety
- Prisma ORM for database interactions
- SQLite database (for development)
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
/
├── src/                  # Frontend React application
│   ├── api/              # API client code
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   └── types/            # TypeScript type definitions
├── backend/              # Backend Node.js application
│   ├── prisma/           # Prisma schema and migrations
│   └── src/              # Backend source code
│       ├── controllers/  # Route controllers
│       ├── middleware/   # Express middleware
│       ├── models/       # Types for requst and payload
│       └── routes/       # API routes
├── README.md             # Project documentation
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies for both frontend and backend:
    ```bash
    # Install frontend dependencies
    npm install
    
    # Install backend dependencies
    cd backend && npm install
    ```

3. Set up environment variables for the backend:

    Create a `.env` file in the `backend` directory with:

    ```
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your_jwt_secret_key_here"
    PORT=5000
    ```

4. Initialize the database:

```bash
cd backend && npx prisma migrate dev --name init
```

### Running the Application

Start both the frontend and backend with a single command:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Frontend
npm run dev

# Backend
npm run backend
```

The frontend will be available at http://localhost:5173 and the backend API at http://localhost:5000.

## Development Workflow

1. Start the development servers
2. Make changes to the code
3. The changes will be reflected automatically due to hot reloading

## Building for Production

```bash
# Build frontend
npm run build

# Build backend
cd backend && npm run build
```
