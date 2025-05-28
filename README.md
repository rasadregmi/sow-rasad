# Project Documentation

## Technologies Used

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.18.0
- **HTTP Client**: Axios 1.6.0
- **UI Libraries**: React Icons 4.11.0
- **CSS**: Custom CSS with responsive design
- **Testing**: Jest with React Testing Library

### Backend
- **Runtime**: Node.js (v16.x)
- **Framework**: Fastify 5.3.2
- **ORM**: Sequelize 6.37.7
- **Database**: PostgreSQL 8.15.6
- **Middleware**: @fastify/cors 11.0.1

## Project Structure
- Frontend: React single-page application
- Backend: RESTful API built with Fastify
- Database: PostgreSQL with Sequelize ORM

## Deployment Method
- **Frontend**: Deployed on Vercel
  - CI/CD pipeline connected to GitLab repository
  - Automatic deployments on push to main branch
  
- **Backend**: Deployed on Render
  - Web service with auto-deploy from GitLab
  - PostgreSQL database hosted on Render

## Live URLs
- Frontend: https://your-app-name.vercel.app
- Backend API: https://your-api-name.onrender.com

## Setup Instructions
1. Clone the repository
2. Run `npm run install:all` to install dependencies
3. Set up environment variables
4. Run `npm start` to start development servers