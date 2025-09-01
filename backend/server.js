require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { predictGPR } = require('./gprModel');

const app = express();

// Load config from .env
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'GPR backend is running' });
});

// Prediction endpoint
app.post('/predict', (req, res) => {
  const { AS, AC, CE } = req.body;

  const AS_num = parseFloat(AS);
  const AC_num = parseFloat(AC);
  const CE_num = parseFloat(CE);

  // Validate existence
  if ([AS, AC, CE].some(v => v === undefined)) {
    return res.status(400).json({ error: "Missing input values" });
  }

  // Validate numeric
  if ([AS_num, AC_num, CE_num].some(v => isNaN(v))) {
    return res.status(400).json({ error: "All input values must be numeric" });
  }

  try {
    // Reload arrays on each request
    const arraysPath = path.join(__dirname, 'gprArrays.json');
    const { A, Z } = JSON.parse(fs.readFileSync(arraysPath, 'utf8'));

    // Predict
    const prediction = predictGPR([AS, AC, CE], A, Z);

    res.json({ prediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Prediction failed', details: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
