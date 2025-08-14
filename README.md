# PickleSpot

#### FPT FA25 Final Capstone Project

---

## Tooling & Stack:

- [Node.js](https://nodejs.org/en) (backend)
- [React.js](https://react.dev/) (frontend)
- [npm](https://www.npmjs.com/) (JavaScript package manager)
- [TailwindCSS](https://tailwindcss.com/) (utility CSS)
- [Vercel](https://vercel.com) (deployment platform)
- [Github](https://github.com) (version control)
- [ESLint](https://eslint.org/) (linting)
- [Prisma Postgres](https://www.prisma.io/postgres) (database)

---

## Project overview:

This monorepo contains the code for the PickleSpot website, including:
- React.js frontend in `client/` directory
- Node. js backend in `server/` directory

---

## Getting Started:

### 1. Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v22 or higher)
- Git

```
# Check Node.js version

node -v

# Check npm version

npm -v

# Install npm

npm install -g npm@latest
```

### 2. Clone the repository:

```
git clone https://github.com/PhungNhatTan/PickleSpot.git
cd PickleSpot
```

### 3. Install dependencies:

```
# Install all dependencies
npm run install-all
```

### 4. Start development server

```
# Start the development server
npm run dev
```

The application will be available at:  http://localhost:5173/

---

## Development workflow

### Available scripts:

```
# Development
npm run dev
npm run server
npm run client

# Production
npm start
npm run build-client

# Code quality
npm run lint
npm run lint:client
npm run lint:server
```

### Project structure

### Code quality

This project use ESLint for linting and formatting:

```
# Check whole project
npm run lint

# Check client
npm run lint:client

# Check server
npm run lint:server
```