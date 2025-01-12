# WanderLuxe Ventures Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Frontend (React)](#frontend-react)
   - [Project Structure](#project-structure)
   - [Key Components](#key-components)
   - [Routing](#routing)
   - [State Management](#state-management)
   - [Styling](#styling)
4. [Backend (FastAPI)](#backend-fastapi)
5. [API Endpoints](#api-endpoints)
6. [Database](#database)
7. [Authentication](#authentication)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Contributing](#contributing)

## Introduction

WanderLuxe Ventures is a blog website built with React for the frontend and FastAPI for the backend. This documentation provides an overview of the project structure, key components, and development guidelines.

## System Architecture

WanderLuxe Ventures follows a client-server architecture:

- Frontend: React (Single Page Application)
- Backend: FastAPI (Python-based REST API)
- Database: PostgreSQL
- Authentication: JWT (JSON Web Tokens)

## Frontend (React)

### Project Structure

The React frontend is organized as follows:

```
src/
|-- components/
|   |-- navbar/
|   |-- footer/
|   |-- side-menu/
|-- pages/
|   |-- home/
|   |-- about/
|   |-- blogs/
|   |-- destinations/
|   |-- contact/
|-- App.js
|-- index.js
```

### Key Components

1. **Header**: Contains the navigation menu and logo.
2. **Footer**: Displays copyright information and social media links.
3. **BlogPost**: Renders individual blog posts.
4. **BlogList**: Displays a list of blog posts.
5. **CommentSection**: Allows users to view and add comments to blog posts.
6. **AuthForm**: Handles user registration and login.
7. **UserProfile**: Displays and allows editing of user information.

### Routing

We use React Router for navigation. Main routes include:

- `/`: Home page
- `/blog`: Blog list page
- `/blog/:id`: Individual blog post page
- `/about`: About page
- `/contact`: Contact page
- `/login`: Login page
- `/register`: Registration page
- `/profile`: User profile page

### State Management

We use a combination of React Context API and local component state for state management. The main contexts are:

1. **AuthContext**: Manages user authentication state.
2. **BlogContext**: Manages global blog post state.

### Styling

We use a tailwind and react-icons along with v0.dev

## Backend (FastAPI)

(This section is under development. The following is a placeholder structure.)

### Project Structure

```
backend/
|-- app/
|   |-- api/
|   |-- core/
|   |-- db/
|   |-- models/
|   |-- schemas/
|-- tests/
|-- main.py
```

## API Endpoints

(This section is under development. The following are placeholder endpoints.)

- `GET /api/posts`: Retrieve all blog posts
- `GET /api/posts/{id}`: Retrieve a specific blog post
- `POST /api/posts`: Create a new blog post
- `PUT /api/posts/{id}`: Update a blog post
- `DELETE /api/posts/{id}`: Delete a blog post
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

## Database

We use PostgreSQL as our database. The main tables are:

1. **users**: Stores user information
2. **posts**: Stores blog post data
3. **comments**: Stores comments on blog posts

(Detailed schema will be provided once the backend development is complete.)

## Authentication

We use JWT (JSON Web Tokens) for authentication. The authentication flow is as follows:

1. User registers or logs in
2. Server validates credentials and returns a JWT
3. Client stores the JWT in local storage
4. Client includes the JWT in the Authorization header for subsequent requests

## Deployment

### Frontend Deployment

The React frontend is deployed on Vercel. To deploy:

1. Push your changes to the main branch of the GitHub repository
2. Vercel will automatically build and deploy the changes

### Backend Deployment

(This section will be completed once the backend development is finished.)

## Testing

### Frontend Testing

We use Jest and React Testing Library for frontend testing. To run tests:

```bash
npm test
```

### Backend Testing

(This section will be completed once the backend development is finished.)

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b this-repo`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

Please ensure that your code follows the project's coding standards and includes appropriate tests.

---

This documentation is a living document and will be updated as the project evolves. For any questions or clarifications, please contact me.
