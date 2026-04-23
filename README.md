# E-Commerce Application

A full-stack e-commerce web application with user authentication, product catalog, shopping cart, and order management system.

[![Version](https://img.shields.io/badge/version-1.0.0-blue)]() [![License](https://img.shields.io/badge/license-ISC-green)]() [![Status](https://img.shields.io/badge/status-Active-success)]()

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Environment Variables](#environment-variables)
8. [Running the Application](#running-the-application)
9. [Available Scripts](#available-scripts)
10. [API Documentation](#api-documentation)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)
13. [License](#license)

---

## Overview

This e-commerce application is a modern, full-stack solution built with React and Express. It provides a seamless shopping experience with secure user authentication, comprehensive product management, and order tracking capabilities. The application features a responsive UI with animation, a powerful admin dashboard, and RESTful API endpoints.

---

## Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Vite** 5.1.4 - Build tool & development server
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **Framer Motion** 12.34.1 - Animation library
- **React Router DOM** 6.22.1 - Client-side routing
- **Axios** 1.6.7 - HTTP client
- **Lucide React** 0.344.0 - Icon library
- **React Toastify** 10.0.4 - Notifications

### Backend
- **Node.js & Express** 4.18.2 - Server framework
- **MongoDB & Mongoose** 8.2.0 - Database & ODM
- **JWT (jsonwebtoken)** 9.0.2 - Authentication
- **bcryptjs** 2.4.3 - Password hashing
- **CORS** 2.8.5 - Cross-origin requests
- **Nodemon** 3.1.0 - Development tool

---

## Features

✨ **User Authentication**
- JWT-based login and registration
- Secure password hashing with bcryptjs
- Role-based access control (User & Admin)

📦 **Product Management**
- Browse complete product catalog
- View detailed product information
- Search and filter functionality
- Product image handling with fallback

🛒 **Shopping Cart**
- Add/remove items from cart
- Update item quantities
- Persistent cart management
- Real-time cart updates

📋 **Order Management**
- Complete checkout process
- Order history tracking
- Order status management
- Order details view

👨‍💼 **Admin Dashboard**
- Product administration
- Order management
- User management
- Analytics overview

🛡️ **Security Features**
- JWT token-based authentication
- Protected routes and endpoints
- Password encryption
- CORS protection
- Error boundary for React errors

---

## Project Structure

```
Ecom/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ImageWithFallback.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ui/        # Reusable UI elements
│   │   ├── context/        # React Context for state management
│   │   │   └── AuthContext.jsx
│   │   ├── pages/          # Page components for routes
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Register.jsx
│   │   ├── utils/          # Utility functions
│   │   │   └── motion.js   # Animation utilities
│   │   ├── App.jsx         # Root app component
│   │   ├── index.css       # Global styles
│   │   ├── main.jsx        # Entry point
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── postcss.config.js   # PostCSS configuration
│   └── package.json
│
├── server/                 # Express backend application
│   ├── controllers/        # Business logic and route handlers
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── models/             # Database schemas
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/             # API route definitions
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── middleware/         # Express middleware
│   │   └── authMiddleware.js
│   ├── config/             # Configuration files
│   │   └── db.js           # Database connection
│   ├── data/               # Seed data
│   │   ├── products.js
│   │   └── users.js
│   ├── server.js           # Main server entry point
│   ├── seeder.js           # Database seeding script
│   └── package.json
│
├── postman_collection.json # API endpoints collection
├── package.json            # Root package.json
└── README.md              # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### MongoDB Setup

**Option 1: Local MongoDB**
- Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service

**Option 2: MongoDB Atlas (Cloud)**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get connection string

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Ecom
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # or create manually

# Add your environment variables (see Environment Variables section)

# (Optional) Seed the database with sample data
npm run data:import
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # or create manually

# Add your environment variables (see Environment Variables section)
```

---

## Environment Variables

### Backend (.env)

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Note:** Change values according to your setup, especially `JWT_SECRET` and database URIs.

---

## Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Mode

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Backend:**
```bash
cd server
npm start
```

Frontend build files (in `dist/`) should be served by your hosting platform or web server.

---

## Available Scripts

### Backend Scripts (`server/`)

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start development server with hot-reload (requires nodemon) |
| **start** | `npm start` | Start production server |
| **data:import** | `npm run data:import` | Seed database with sample products and users |
| **data:destroy** | `npm run data:destroy` | Clear all data from database |

### Frontend Scripts (`client/`)

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start Vite development server |
| **build** | `npm run build` | Build for production |
| **preview** | `npm run preview` | Preview production build locally |
| **lint** | `npm run lint` | Run ESLint to check code quality |

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Main Endpoints

#### 🔐 Authentication Routes (`/auth`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

#### 📦 Product Routes (`/products`)
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

#### 🛒 Cart Routes (`/cart`)
- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:itemId` - Update cart item quantity
- `DELETE /cart/:itemId` - Remove item from cart

#### 📋 Order Routes (`/orders`)
- `POST /orders` - Create new order
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `PUT /orders/:id` - Update order status (Admin)

### Using Postman

Import the `postman_collection.json` file into Postman to test all endpoints with pre-configured requests.

---

## Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Check what's using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux

# Kill the process or use a different port in .env
```

#### 2. **MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solutions:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- For Atlas, verify IP whitelist allows your connection

#### 3. **CORS Errors**
```
Access to XMLHttpRequest at 'http://localhost:5000...' blocked by CORS policy
```
**Solutions:**
- Ensure `CORS_ORIGIN` matches frontend URL
- Check `cors` middleware configuration in server.js

#### 4. **Dependencies Installation Issues**
```bash
# Clear cache and reinstall
npm cache clean --force
npm install
```

#### 5. **Vite Development Server Not Starting**
```bash
# Kill any process on port 5173
# Try with specific host
npm run dev -- --host 0.0.0.0
```

#### 6. **JWT Token Issues**
- Ensure `JWT_SECRET` is set in .env
- Check token expiration in authMiddleware
- Verify token is being sent in request headers

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Code Style

- Follow ESLint configuration in the project
- Use consistent naming conventions
- Comment complex logic
- Write meaningful commit messages

---

## License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team

---

## Acknowledgments

- [React](https://react.dev) - UI Library
- [Vite](https://vitejs.dev) - Build Tool
- [Tailwind CSS](https://tailwindcss.com) - CSS Framework
- [Express.js](https://expressjs.com) - Web Framework
- [MongoDB](https://www.mongodb.com) - Database
- [Framer Motion](https://www.framer.com/motion) - Animation Library

---

**Happy coding! 🚀**
