# MERN Stack Task Tracker

A full-stack Task Tracker web application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Task Management (CRUD)**: Create, view, update, and delete tasks.
- **Authentication**: JWT-based user registration and login.
- **Responsive UI**: Fully usable on mobile, tablet, and desktop, styled with Tailwind CSS v4.
- **Dynamic Updates**: Manage state with React Context API and hooks without full page reloads.
- **Live Search**: Filter tasks by title or description in real-time.
- **Filtering & Sorting**: Filter tasks by status and priority, and sort by due date or creation date.
- **Toast Notifications**: Interactive user feedback.

## Setup and Installation

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or Atlas)

### 1. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the `server/` directory with the following keys:

- `PORT` (e.g., `5000`)
- `MONGO_URI` (Your MongoDB connection string)
- `JWT_SECRET` (A secret key for signing JSON Web Tokens)
