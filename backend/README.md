# Auth Backend

A TypeScript-based Node.js backend for authentication using Express and Prisma.

## Tech Stack

- Node.js with Express
- TypeScript
- Prisma ORM
- SQLite database (for development)
- JWT authentication
- bcrypt for password hashing

## Project Structure

- `src/` - Source code
  - `index.ts` - Entry point
  - `controllers/` - Controller logic
  - `middleware/` - Custom middleware
  - `modles/` - Datatype definitions
  - `routes/` - API routes
- `prisma/` - Prisma schema and migrations

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory with the following variables:
    
    ```
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your_jwt_secret_key_here"
    PORT=5000
    ```

4. Initialize the database:

```bash
npx prisma migrate dev --name init
```

### Running the Server

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ email: string, password: string }`
  - Response: `{ success: boolean, token: string, user: { id: string, email: string } }`

- `POST /api/auth/login` - Login a user
  - Body: `{ email: string, password: string }`
  - Response: `{ success: boolean, token: string, user: { id: string, email: string } }`

- `GET /api/auth/me` - Get current user (protected route)
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ success: boolean, user: { id: string, email: string } }`

## Error Handling

The API uses a centralized error handling approach with the `AppError` class and `errorHandler` middleware. This provides consistent error responses across the API.

Example error response (note that the error stack is visible only in dev environment):

```json
{
  "success": false,
  "error": "Not authorized, invalid token",
  "stack": "..."
}
```
