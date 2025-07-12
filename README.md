# 💬 DevTinder – A Social Connection Platform 
## (Backend)

**DevTinder** is a scalable backend system for a social networking platform. It supports real-time features, user connections, authentication, dynamic feed APIs, and clean REST architecture.

---

## 🔧 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JWT + bcrypt
* **Tools:** Postman, Git, VS Code

---

## ✅ Core Features

* 🚀 Backend setup using **Node.js**, **Express**, and **MongoDB**
* 🧱 Modular architecture with **controllers**, **routes**, **middlewares**, and **models**
* 🔐 **JWT authentication** with **bcrypt password hashing**
* 🧩 MongoDB **schema relationships** with `ref` and `populate`
* 📜 Dynamic **feed API with pagination**
* 📬 Connection & Review **request APIs**
* ⚙️ Optimized queries using **indexes**, `$or`, `$and`, etc.
* 📐 Designed with **High-Level** and **Low-Level Architecture** principles
* 🛡️ Centralized error handling and API validation middleware

---

## 📁 Project Structure

```bash
devtinder/
├── controllers/         # Business logic
├── models/              # Mongoose schemas
├── routes/              # API route definitions
├── middlewares/         # Auth, validation, error handling
├── utils/               # Helper functions
├── server.js            # Entry point
├── .env                 # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sane-aalam/devtinder.git
cd devtinder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in root

```env
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the backend server

```bash
npm start
nodemon app.js
```

---

## 📌 Future Improvements

* Real-time chat with **Socket.IO**
* **Push notifications** support
* **Rate limiting** and improved **security headers**
* Admin dashboard for **analytics and moderation**

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

Built for mastering real-world backend development patterns with clean, scalable code practices.

---