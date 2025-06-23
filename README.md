# MERN Stack Blog Website - Backend

A robust RESTful API backend for a blog website built with Node.js, Express.js, and MongoDB as part of a full MERN stack application.

## 🚀 Features

- **RESTful API** - Clean and organized API endpoints
- **JWT Authentication** - Secure user authentication
- **MongoDB Integration** - NoSQL database with Mongoose ODM
- **File Upload** - Image upload functionality with Multer
- **Password Hashing** - Secure password storage with bcryptjs
- **CORS Enabled** - Cross-origin resource sharing
- **Error Handling** - Comprehensive error handling middleware

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Multer
- CORS
- dotenv

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/asheint/mern-stack-blog-website-backend.git
cd mern-stack-blog-website-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 🔗 API Endpoints

### Authentication

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## 🔗 Frontend Repository

This backend works with the MERN Stack Blog Website Frontend:
[https://github.com/asheint/mern-stack-blog-website](https://github.com/asheint/mern-stack-blog-website)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

If this project helped you, please consider:

- Giving it a ⭐ on GitHub
- Supporting me on [Buy Me a Coffee](https://buymeacoffee.com/asheint) ☕

## 📝 License

This project is licensed under the MIT License.

---

**Star this repo if it helped you!** ⭐
