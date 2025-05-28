# SOW Application

This application consists of a backend API and a frontend application.

## Setup

1. Ensure you have Node.js installed
2. Make sure PostgreSQL is installed and running
3. Set up environment variables:

### Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following content:
   ```
   DATABASE_URL="your-postgresql-connection-string"
   ```
4. Start the server: `npm start`

### Frontend Setup

1. Navigate to the frontend directory: `cd frontend` 
2. Install dependencies: `npm install`
3. Create a `.env` file with the following content:
   ```
   REACT_APP_BACKEND_URL=http://localhost:3001
   ```
4. Start the frontend: `npm start`

## Quick Start

For convenience, you can use the start script to run both the backend and frontend:

```bash
./start.sh
```

## Data Endpoints

The backend provides the following endpoints:

- `/terms` - English terms and conditions
- `/terms-swedish` - Swedish terms and conditions
- `/nav-items` - English navigation items
- `/nav-items-swedish` - Swedish navigation items

## Troubleshooting

If you encounter issues with data not being displayed:

1. Check that the backend server is running
2. Verify the database connection string is correct
3. Check that the frontend is properly configured to connect to the backend
4. Look at the browser console and server logs for error messages
