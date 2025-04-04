const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 23456;

// Правильный путь к базовой директории
process.env.BASEDIR = path.join(__dirname, '..');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', require('./routes'));

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});