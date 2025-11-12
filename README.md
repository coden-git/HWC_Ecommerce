# Wellness Products Application

A full-stack wellness products application built with Express.js backend and React Vite frontend.

## Features

- **Express Server**: RESTful API with CORS support
- **React Client**: Modern React application with Vite
- **Privacy Policy**: Comprehensive privacy policy page tailored for wellness products
- **Responsive Design**: Mobile-friendly interface
- **Routing**: React Router for navigation

## Project Structure

```
wellness/
├── server/          # Express.js backend
│   ├── index.js     # Main server file
│   ├── package.json # Server dependencies
│   └── .env         # Environment variables
├── client/          # React Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Button.jsx   # Custom button component
│   │   │   ├── Card.jsx     # Card component
│   │   │   └── index.js     # Components barrel export
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx    # Home page
│   │   │   ├── PrivacyPolicy.jsx # Privacy policy page
│   │   │   └── index.js    # Pages barrel export
│   │   ├── App.jsx         # Main App component
│   │   ├── index.css       # Tailwind CSS imports
│   │   └── main.jsx        # React app entry point
│   ├── tailwind.config.js  # Tailwind configuration
│   ├── postcss.config.js   # PostCSS configuration
│   └── package.json        # Client dependencies
└── package.json     # Root package.json with scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone or navigate to the project directory:
   ```powershell
   cd d:\coden\wellness
   ```

2. Install dependencies for both server and client:
   ```powershell
   npm run install-deps
   ```

### Development

Run both server and client in development mode:
```powershell
npm run dev
```

This will start:
- Express server on http://localhost:5000
- React client on http://localhost:5173

### Individual Commands

Run only the server:
```powershell
npm run server
```

Run only the client:
```powershell
npm run client
```

Build the client for production:
```powershell
npm run build
```

## API Endpoints

### Server (http://localhost:5000)

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Sample users data

### Client Routes

- `/` - Home page
- `/privacy-policy` - Privacy policy page

## Privacy Policy

The privacy policy has been specifically tailored for wellness products businesses and includes:

- Health information protection
- Wellness-specific data collection
- Product delivery and personalization
- Compliance with health product regulations
- Customer rights and choices

## Technologies Used

### Backend
- Express.js
- CORS
- dotenv
- nodemon (development)

### Frontend
- React 18
- Vite
- React Router DOM
- CSS3 with responsive design

## Contact

For questions about the privacy policy or application:
- Email: privacy@wellnesscompany.com
- Phone: +1 (555) 123-4567

## License

ISC