# Fullstack Blog Manager App

This is a fullstack project structured into two folders:

- `/front-end`: React app built with **Vite**, **TypeScript**, and **Ant Design**
- `/back-end`: Express-based mock API with static JSON data

The app displays blog posts for a user, allows editing them, and simulates post updates.

---

## 📁 Project Structure

```
/
├── front-end/         # React + Vite frontend
├── back-end/          # Express backend API
├── .gitignore         # Shared ignore config for both
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/fullstack-blog-app.git
cd fullstack-blog-app
```

### 2. Install dependencies

#### Frontend

```bash
cd front-end
yarn install      # or npm install
```

#### Backend

```bash
cd ../back-end
yarn install      # or npm install
```

---

### 3. Environment Variables

Create the following `.env` files in their respective folders:

#### `/front-end/.env`

```env
VITE_API_URL=http://localhost:5001
VITE_JSON_PLACEHOLDER=https://jsonplaceholder.typicode.com
VITE_PAGE_SIZE=5
```

#### `/back-end/.env`

```env
PORT=5001
```

> ⚠️ **Why we don’t use port 6000:**
> Port `6000` is considered **unsafe** by modern browsers (especially Chrome) because it conflicts with X11 (a Linux graphics protocol).
> As a result, requests to `http://localhost:6000` will fail silently.
> We use **port 5001**, which is safe and commonly used for APIs.

---

### 4. Run the App

#### Start Backend

```bash
cd back-end
yarn dev     # or npm run dev
```

It will run on: `http://localhost:5001`

#### Start Frontend

```bash
cd front-end
yarn dev     # or npm run dev
```

It will run on: `http://localhost:5173`

---

## 🔧 Features

- 🧑 Shows a random user on each page load (from 10 users)
- 📝 Displays 50 blog posts with real images
- ↻ Edit blog title & body using a form
- 📦 Simulates update via `jsonplaceholder.typicode.com`
- ✅ Success/failure toast messages using Ant Design
- 🧪 Delete confirmation (simulated only)
- 📚 Organized using Vite + TypeScript + AntD + Express

---

## 🗃️ .gitignore

`.gitignore` is placed at the root and configured to ignore:

- Logs, build folders (`dist/`, `.cache/`)
- OS files like `.DS_Store`
- `node_modules/` in both `front-end` and `back-end`
- Environment files (`.env`, `.env.*`)

---

## 📸 Screenshots

> _Add screenshots or a short demo GIF here if desired._

---

## 📄 License

MIT — Free to use, modify, and distribute.
