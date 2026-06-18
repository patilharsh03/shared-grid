# Shared Grid

A real-time collaborative grid application where users can claim cells on a shared board and see updates instantly across all connected clients.

Built with React, Node.js, Socket.IO, and MongoDB, the application demonstrates real-time communication, conflict resolution, and persistent state management.

## Live Demo

* **Frontend:** https://shared-grid-dusky.vercel.app/
* **Backend:** https://shared-grid-jnn7.onrender.com/

## Features

* Interactive 30×30 grid (900 cells)
* Real-time updates using WebSockets
* Persistent cell ownership with MongoDB
* Random user names and colors
* Live leaderboard
* Atomic conflict handling to prevent duplicate claims
* Responsive UI with hover animations
* Loading screen for backend cold starts
* Database reset script for clean testing

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Vercel (Frontend)
* Render (Backend)

## Real-Time Workflow

1. User opens the application.
2. Frontend establishes a Socket.IO connection.
3. Server sends the current grid state.
4. User clicks an unclaimed cell.
5. Backend validates ownership.
6. MongoDB updates the cell atomically.
7. Server broadcasts the updated cell to all clients.
8. All connected users see the change instantly.
9. Leaderboard updates in real time.

## Environment Variables

### Frontend (`client/.env`)

```env
VITE_SOCKET_URL=http://localhost:5000
```

### Backend (`server/.env`)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/patilharsh03/shared-grid
cd shared-grid
```

Install dependencies:

```bash
cd client
npm install

cd ../server
npm install
```

Create `.env` files in both the `client` and `server` directories.

Seed the database:

```bash
cd server
npm run seed
```

Start the backend:

```bash
npm run dev
```

Start the frontend:

```bash
cd ../client
npm run dev
```

Open:

```text
http://localhost:5173
```

## Reset the Board

To clear all claimed cells and create a fresh board:

```bash
cd server
npm run seed
```
