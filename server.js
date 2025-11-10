const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Calculate function - handles mathematical expressions
function calculate(expression) {
  try {
    // Clean the expression
    let processedExpression = expression.trim();
    
    if (processedExpression === '') {
      throw new Error('Empty expression');
    }

    // Replace × with * and ÷ with / for JavaScript evaluation
    processedExpression = processedExpression
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Handle percentage: Replace patterns like "50%" with "(50/100)"
    // Match numbers (including decimals) followed by %
    processedExpression = processedExpression.replace(/(\d+\.?\d*)%/g, '($1/100)');

    // Validate expression contains only allowed characters after processing
    if (!/^[0-9+\-*/.()\s]+$/.test(processedExpression)) {
      throw new Error('Invalid expression');
    }

    // Evaluate the expression safely
    // Remove any whitespace
    processedExpression = processedExpression.replace(/\s/g, '');
    
    // Basic validation: check for balanced parentheses
    let parenCount = 0;
    for (let char of processedExpression) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (parenCount < 0) throw new Error('Invalid expression');
    }
    if (parenCount !== 0) throw new Error('Invalid expression');

    // Evaluate using Function constructor (safer than eval, but still requires careful validation)
    const result = Function('"use strict"; return (' + processedExpression + ')')();
    
    // Handle division by zero and invalid results
    if (!isFinite(result)) {
      throw new Error('Division by zero or invalid result');
    }

    // Format result: remove unnecessary decimals
    if (result % 1 === 0) {
      return result.toString();
    } else {
      // Round to 10 decimal places to avoid floating point issues
      return parseFloat(result.toFixed(10)).toString();
    }
  } catch (error) {
    throw new Error('Invalid expression');
  }
}

// API endpoint for calculation
app.post('/api/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression || typeof expression !== 'string') {
      return res.status(400).json({ error: 'Expression is required' });
    }

    const result = calculate(expression);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

