# 📚 Library Management API

A full-featured Library Management System built using **Express.js**, **TypeScript**, and **MongoDB** (via **Mongoose**). This project handles book inventory, borrowing functionality, and offers robust filtering, validation, and business logic.

## 🚀 Features

- 📘 Add, view, update, and delete books
- 🧠 Business logic: borrowing books reduces inventory
- 📊 Aggregation summary for borrowed books
- 🧹 Middleware for pre/post logic hooks
- 🧾 Static & instance methods (availability control)
- 🧪 Strict schema validation
- 🔎 Filtering, sorting & pagination
- ✅ Proper error handling with uniform response structure

---

## 🛠️ Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose

---

## 📦 API Endpoints

### 📚 Book Routes

#### 1. Create a Book

`POST /api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### 2. Get All Books (With Filtering & Sorting)

`GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### 3. Get Book by ID

`GET /api/books/:bookId`

#### 4. Update Book

`PUT /api/books/:bookId`

```json
{ "copies": 50 }
```

#### 5. Delete Book

`DELETE /api/books/:bookId`

---

### 📖 Borrow Routes

#### 6. Borrow a Book

`POST /api/borrow`

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### 7. Borrowed Summary

`GET /api/borrow`

Returns total borrowed quantity per book (using aggregation pipeline).

---

## ✅ Validation

- `copies`: Must be a non-negative integer
- `isbn`: Must be unique
- `genre`: Must be one of `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`
- `quantity`: Must be positive

---

## ⚙️ Setup & Run Locally

```bash
git clone https://github.com/Shanto57575/next_level_assignment_3.git
cd next_level_assignment_3
npm install
```

### Create `.env` file

```env
PORT="YOUR PORT"
MONGODB_URL="YOUR MONGODB URL"
```

### Start Server

```bash
npm run dev
```

## 🎥 Video Demo

Watch the video explanation here: [Click to View](https://drive.google.com/file/d/1Nld93uJ1RoHlcp91N_06PRVou0AGcm9k/view?usp=sharing)

## 🌐 Live Site

Live API hosted at: [https://nextlevellibrarymanagmentapi.vercel.app](https://nextlevellibrarymanagmentapi.vercel.app)

## 👨‍💻 Author

`Md Shahidul Islam Shanto`

`Full Stack Developer`

[My portfolio](https://shansphere.vercel.app)
