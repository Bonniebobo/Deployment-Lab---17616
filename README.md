# Calculator App

A basic calculator application built with Node.js backend and React frontend.

## Features

- **Numbers**: 0-9 and decimal point (.)
- **Operators**: +, -, ×, ÷, %, =, +/-, Clear, Backspace
- **Real-time expression display** as you type
- **Backend calculation** via API endpoint
- **Clean UI** with modern design

## Project Structure

```
CalculatorApp/
├── server.js          # Express backend server
├── package.json       # Backend dependencies
├── client/            # React frontend application
│   ├── src/
│   │   ├── App.js     # Main App component
│   │   ├── Calculator.js  # Calculator component
│   │   └── Calculator.css # Calculator styles
│   └── package.json   # Frontend dependencies
└── README.md          # This file
```

## Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Application

### Option 1: Run Backend and Frontend Separately

1. Start the backend server (from root directory):
```bash
npm start
```
The backend will run on http://localhost:5001

2. Start the frontend (in a new terminal):
```bash
cd client
npm start
```
The frontend will run on http://localhost:3000

### Option 2: Run Both Together (if concurrently is installed)

```bash
npm run dev
```

## Usage

1. Click number buttons to build your expression
2. Click operator buttons (+, -, ×, ÷, %) to add operations
3. Click "=" to calculate the result
4. Click "Clear" to reset the calculator
5. Click "⌫" (Backspace) to remove the last character
6. Click "+/-" to toggle the sign of the current number

## API Endpoint

### POST /api/calculate

Calculate the value of a mathematical expression.

**Request:**
```json
{
  "expression": "5+3×2"
}
```

**Response:**
```json
{
  "result": "11"
}
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Styling**: CSS3 with modern gradients and animations

## Notes

- The calculator handles basic arithmetic operations: addition, subtraction, multiplication, division, and percentage
- Percentage is calculated as: `50%` = `50/100` = `0.5`
- The backend validates expressions and handles errors gracefully
- Division by zero will return an error

