    # 📱 Trilo — Modern Social App 🚀

<!-- ![Trilo App Screenshot](/mobile/assets/images/screenshot-for-readme.png) -->

**Trilo** is a modern, full-stack social media mobile app built with **React Native**.
It allows users to share moments, connect with others, and communicate in real time.

---

## 🌟 Overview

Trilo is more than just a social feed — it's a complete platform featuring:

* 📝 Social posting (text & images)
* ❤️ Likes & comments
* 🔔 Notifications
* 💬 Real-time messaging
* 👤 User profiles
* 🔎 Content discovery

Built with scalability and real-world production in mind.

---

## ✨ Features

### 🔐 Authentication

* Secure login/signup using **Clerk**
* Supports Google & Apple sign-in

### 🏠 Home Feed

* Create posts with text and images
* Upload via gallery or camera
* Scrollable dynamic feed

### ❤️ Engagement

* Like and comment on posts
* Smooth modal interactions

### 🔔 Notifications

* Get notified when users:

  * like your posts
  * comment on your posts

### 📬 Messaging (Real-Time)

* One-to-one chat system
* Instant message delivery ⚡
* Live updates (no refresh needed)
* Chat history
* Long-press to delete messages
* Typing indicators *(planned)*
* Online/offline status *(planned)*

### 👤 Profile

* Edit profile information
* View user posts

### 🔎 Search

* Discover trending content
* Find users and posts

### 🚪 Authentication Flow

* Secure sign-out
* Redirect to login screen

---

## 🧠 Tech Stack

### 📱 Mobile (Frontend)

* React Native (Expo)
* TypeScript
* Clerk (Auth)

### 🛠️ Backend

* Node.js
* Express.js
* MongoDB (Atlas)

### ☁️ Services

* Cloudinary (Image uploads)
* Arcjet (Security & rate limiting)
* Socket.IO (Real-time messaging)

---

## 🧱 Architecture

```
trilo/
├── mobile/        # React Native (Expo)
├── backend/       # Express API + Socket.IO
└── README.md
```

---

## ⚙️ Environment Setup

### 🔧 Backend (`/backend`)

```bash
PORT=5001
NODE_ENV=development

CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>

MONGO_URI=<your_mongodb_connection_uri>

ARCJET_ENV=development
ARCJET_KEY=<your_arcjet_api_key>

CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

---

### 📱 Mobile (`/mobile`)

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
EXPO_PUBLIC_API_URL=<your_backend_api_url>
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/trilo.git
cd trilo
```

---

### 2️⃣ Run Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Run Mobile App

```bash
cd mobile
npm install
npx expo start
```

---

## 🔌 Real-Time Messaging Setup (Socket.IO)

Trilo uses **Socket.IO** to power real-time chat.

### Key Features:

* Instant messaging
* Live updates
* Typing indicators (planned)
* Presence tracking (planned)

### Basic Flow:

* User connects via socket
* Server tracks active users
* Messages are emitted in real time
* Stored in MongoDB

---

## 📈 Future Improvements

* 📸 Stories feature
* 🎥 Video posts
* 🔥 Trending algorithm
* 📊 Analytics dashboard
* 🌐 Web version (Next.js)
* 🔔 Push notifications (Firebase)

---

## 🧑‍💻 Author

**Theodore Ijoma**

* GitHub: https://github.com/Theo-ijoma
* Portfolio: https://theooijoma.vercel.app

---

## 📄 License

This project is for educational and personal development purposes.

---

## 💡 Inspiration

Inspired by modern social platforms like X (Twitter), Threads, and real-time communication apps.

---

## 🚀 Final Note

**Trilo is not just a tutorial project — it's a foundation for a real product.**

Build it. Improve it. Launch it. 💯
