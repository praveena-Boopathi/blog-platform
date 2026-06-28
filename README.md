# 📝 Blog Platform with Comments

A full-stack blogging platform built with **React**, **Node.js/Express**, and **MongoDB**.

## Features
- ✅ User registration, login, and JWT authentication
- ✅ Create, edit, delete blog posts
- ✅ Comment section for user interaction
- ✅ RESTful API backend with MongoDB
- ✅ Responsive UI

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |

## Project Structure
```
blog-platform/
├── backend/
│   ├── models/         # User, Post, Comment schemas
│   ├── routes/         # auth, posts, comments APIs
│   ├── middleware/     # JWT auth middleware
│   ├── server.js       # Express app entry
│   └── .env.example    # Environment variables
└── frontend/
    └── src/
        ├── components/ # Navbar
        ├── context/    # Auth context
        └── pages/      # Home, Login, Register, PostDetail, CreatePost, EditPost, Profile
```

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/praveena-Boopathi/blog-platform.git
cd blog-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Environment Variables (backend/.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogplatform
JWT_SECRET=your_super_secret_key
PORT=5000
```

> Get a free MongoDB URI at [mongodb.com/atlas](https://www.mongodb.com/atlas)

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/posts | Get all posts |
| GET | /api/posts/:id | Get single post |
| POST | /api/posts | Create post (auth) |
| PUT | /api/posts/:id | Update post (auth) |
| DELETE | /api/posts/:id | Delete post (auth) |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/comments/post/:postId | Get comments for post |
| POST | /api/comments | Add comment (auth) |
| DELETE | /api/comments/:id | Delete comment (auth) |
