# WealthManager

WealthManager is a full-stack application for managing and tracking your investments. It includes a **Next.js client** and a **Node.js/Express backend** with MongoDB.

## Tech Stack

**Frontend:**

* Next.js 15
* React 18
* Tailwind CSS

**Backend:**

* Node.js
* Express.js
* MongoDB with Mongoose

## Deployment
**Frontend :** https://wealth-manager-nu.vercel.app/ 

**Backend :** https://wealth-manager-d6qt.onrender.com/


## Cloning the Repository

```bash
git clone https://github.com/Rashid-123/Wealth-Manager.git
cd Wealth-Manager
```

## Environment Setup

Create `.env` files in both `client` and `server` folders.

**Example `.env` for Client:**

```env
NEXT_PUBLIC_API_URL = http://localhost:5000
```

**Example `.env` for Server:**

```env
PORT = 5000
MONGO_URI = your-mongodb-uri
```

## Installation

### Install Node.js & npm

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/). This will also install npm.

### Install Dependencies

**Client:**

```bash
cd client
npm install
```

**Server:**

```bash
cd server
npm install
```

## Running the Application

**Start the backend:**

```bash
cd server
npm run dev
```

**Start the frontend:**

```bash
cd client
npm run dev
```

## API Endpoints

**Base URL:** `http://localhost:5000`

### Portfolio

* **GET** `/api/portfolio/holdings` – Get all holdings 
* **GET** `/api/portfolio/allocation` – Sector and Market Cap allocation
* **GET** `/api/portfolio/summary`    – Get Overall summary 

### Performance

* **GET** `/api/performance` – Get performance metrics


## Happy coding 
