# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# BLOG APP FRONTEND
This is the **frontend** of a fullstack MERN blog application, built with **React** and **Vite**. This app supports full user authentication, post and comment management, profile customization and personalized favorites

## Features

### Authentication
- Register
- Login / Logout
- Forgot password / Reset password
- Change email (with confirmation)
- Change password

### Blog Posts
- Fetch all posts
- Search posts by keyword
- View post details
- Create / Edit / Delete posts
- Pagination & Lazy loading

### Comments
- View comments by posts
- Add / Edit / Delete comments
 
### Favorites
- Add posts to favorites
- Remove posts from favorites
- View favorite posts

### User profile
- Fetch profile details
- Edit profile
- View user's own posts

## Tech Stack
- React: UI library
- Vite: Build tool and dev server
- React Router: Client-side routing
- Axios: API communication
- ESLint + Prettier: Code quality & formatting
- Tailwind CSS: Styling

## Installation

```bash
# Clone the repository
git clone https://github.com/congbui12/blog-app-frontend.git

# Navigate into the project
cd blog-app-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
