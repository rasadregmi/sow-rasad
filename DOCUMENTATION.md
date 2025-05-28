# SOW Project Documentation

## Project Overview
This project consists of a React frontend and a Fastify backend with PostgreSQL database. It showcases terms and conditions along with a product price list in a responsive web application with multi-language support.

## Technology Stack

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.18.0
- **HTTP Client**: Axios 1.6.0
- **UI Components**: React Icons 4.11.0
- **CSS**: Custom CSS with responsive design for mobile, tablet, and desktop
- **Testing**: Jest with React Testing Library

### Backend
- **Runtime**: Node.js 
- **Framework**: Fastify 5.3.2
- **ORM**: Sequelize 6.37.7
- **Database**: PostgreSQL 8.15.6
- **CORS Handling**: @fastify/cors 11.0.1
- **Environment Variables**: dotenv 16.4.1

## Project Structure
- **Frontend**: React single-page application with responsive design
- **Backend**: RESTful API built with Fastify
- **Database**: PostgreSQL with Sequelize ORM

## Deployment Method

### Frontend Deployment
- **Platform**: Vercel
- **Repository**: GitHub (https://github.com/rasadregmi/sow-rasad)
- **Branch**: master
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Environment Variables**:
  - `REACT_APP_BACKEND_URL`: URL to the backend API
- **CI/CD**: Automatic deployments on push to master branch

### Backend Deployment
- **Platform**: Render
- **Repository**: GitHub (https://github.com/rasadregmi/sow-rasad)
- **Branch**: master
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `DATABASE_URL`: PostgreSQL connection string
  - `NODE_ENV`: Set to "production"
- **Database**: PostgreSQL hosted on Render

## Live URLs
- **Frontend**: https://sow-rasad.vercel.app
- **Backend API**: https://sow-rasad.onrender.com

## API Endpoints
- `/products` - Get all products
- `/terms` - Get English terms
- `/terms-swedish` - Get Swedish terms
- `/nav-items` - Get English navigation items
- `/nav-items-swedish` - Get Swedish navigation items
- `/health` - Health check endpoint

## Environment Setup
The project uses environment variables for configuration:

### Frontend
- `.env.development` - Development environment settings
- `.env.production` - Production environment settings

### Backend
- `.env` - Environment variables for database connection and server configuration

## Development Setup
1. Clone the repository: `git clone https://github.com/rasadregmi/sow-rasad.git`
2. Install dependencies: `npm run install:all`
3. Start development servers: `npm start`

## Building for Production
1. Frontend: `cd frontend && npm run build`
2. Backend: Deploy with proper environment variables for production

## Database Seeding
Run the following commands to seed the database:
```
cd backend
npm run seed
```

This will populate the database with:
- Terms (English and Swedish)
- Navigation items (English and Swedish)
- Products

## Troubleshooting
- If encountering 404 errors, ensure API endpoints match between frontend and backend
- For database connection issues, verify DATABASE_URL environment variable
- Check CORS settings if experiencing cross-origin issues

## Contributors
- Rasad Regmi
