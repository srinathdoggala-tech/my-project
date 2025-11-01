# Experiment 17A - Connecting React Frontend to Express API Using Axios

## Overview
This project demonstrates how to connect a React frontend application to a backend Express.js API using Axios to fetch data. It shows the integration between frontend and backend parts of a full stack application.

## Features
- **Express.js Backend API**: Serves product data via REST endpoints
- **React Frontend**: Fetches and displays data using Axios
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Proper loading indicators during API calls
- **CORS Support**: Cross-origin requests enabled
- **Responsive Design**: Mobile-friendly UI

## Project Structure
```
Exp-17/Part_A/
├── backend/
│   ├── server.js           # Express server with API endpoints
│   └── package.json        # Backend dependencies
├── src/
│   ├── components/
│   │   ├── ProductList.jsx  # Main component that fetches products
│   │   └── ProductList.css  # Styling for product list
│   ├── App.jsx             # Main app component
│   └── App.css             # Global styles
└── package.json            # Frontend dependencies
```

## API Endpoints
- `GET /` - Server status check
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation Steps

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

## Running the Application

### Method 1: Run Both Simultaneously (Recommended)
```bash
# From the main project directory
npm run full-dev
```

### Method 2: Run Separately

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   # Server will run on http://localhost:5000
   ```

2. **Start the Frontend (in a new terminal)**
   ```bash
   npm run dev
   # Frontend will run on http://localhost:5173
   ```

## Testing the Connection

1. Ensure both servers are running
2. Open your browser to `http://localhost:5173`
3. You should see:
   - A header with the project title
   - A loading spinner initially
   - A grid of products fetched from the API
   - Each product showing name and price

## Error Handling

The application handles various error scenarios:
- **Server Not Running**: Shows a friendly message asking to start the backend
- **Network Errors**: Displays connection error messages
- **API Errors**: Shows specific error messages from the server
- **Retry Functionality**: Allows users to retry failed requests

## Key Learning Points

1. **API Integration**: How to connect React frontend to Express backend
2. **Axios Usage**: Making HTTP requests in React components
3. **State Management**: Managing loading, error, and data states
4. **Error Handling**: Implementing robust error handling
5. **CORS Configuration**: Enabling cross-origin requests
6. **Component Lifecycle**: Using useEffect for API calls on component mount

## Technologies Used

- **Frontend**: React 18, Axios, Vite
- **Backend**: Express.js, CORS
- **Development**: Concurrently, Nodemon

## Troubleshooting

### Common Issues

1. **"Failed to connect to server"**
   - Make sure the backend server is running on port 5000
   - Check if any other application is using port 5000

2. **CORS Errors**
   - Ensure CORS is properly configured in the backend
   - Check if the frontend is making requests to the correct URL

3. **Port Conflicts**
   - Backend runs on port 5000
   - Frontend runs on port 5173 (default Vite port)
   - Change ports in respective configuration files if needed

## Expected Output

When everything is working correctly, you should see:
- A beautiful header with gradient background
- A "Products" section with a refresh button
- Product cards displaying:
  - Product name
  - Product price
  - View Details button
- A footer note indicating data is fetched from Express API using Axios

The application demonstrates a complete full-stack data flow from Express API to React frontend using Axios for HTTP communication.