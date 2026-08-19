# GullakIQ (paisa)

A smart, modern expense management web application designed for young adults and teenagers to track spending, set savings goals, manage investments, and gain financial insights.

## Key Features

- **Dashboard & Analytics**: Real-time spending overview, weekly breakdowns, category summaries, and budget progress indicators.
- **Transaction Tracker**: Quick entry and categorization for daily income and expenses.
- **Savings Goals**: Goal creation, target progress tracking, and deposit allocation.
- **Investment Management**: Portfolio tracking with cost basis vs. current value calculations.
- **Authentication**: JWT-based authentication with resilient in-memory fallback if MongoDB is disconnected.
- **Responsive Dark UI**: Modern glassmorphic interface with custom animated preloader built using React and Tailwind CSS.

## Project Structure

```text
Expense-tracker/
├── backend/                # Node.js Express REST API
│   ├── routes/             # Auth, transactions, goals, investments, user, insights
│   ├── middleware/         # JWT authentication middleware
│   ├── store.js            # In-memory store fallback logic
│   └── server.js           # Express app entry point
└── frontend/               # React (Vite) single-page application
    ├── src/
    │   ├── components/     # UI dashboards, sidebar, modals, preloader
    │   ├── context/        # AuthContext for state & API fetching
    │   └── config.js       # Base API URL helper configuration
    └── vite.config.js      # Development proxy configuration
```

## Configuration

### Backend Environment Variables (`backend/.env`)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gullakiq
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:3000
```

### Frontend Environment Variables (`frontend/.env`)

Create a `.env` file in the `frontend` directory (optional for local development):

```env
VITE_API_URL=http://localhost:5000
```

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Optional: backend includes an in-memory fallback if MongoDB is offline)

### 1. Clone the Repository

```bash
git clone https://github.com/Aniketghosh2003/Expense-tracker.git
cd Expense-tracker
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

## Usage & Commands

### Running Development Servers

#### Start Backend API
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`.

#### Start Frontend Application
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:3000`.

### Build for Production

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Production Backend
```bash
cd backend
npm start
```

## Quick Start Example

1. Start both backend (`http://localhost:5000`) and frontend (`http://localhost:3000`).
2. Open `http://localhost:3000` in your browser.
3. Click **Sign In / Create Account** to register a new user.
4. Add transactions via the **Quick Add** button (`+`) or navigate to **Goals** to create savings targets.

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
