const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Путь к файлу БД
const dbPath = path.join(__dirname, '../db/sqlite3.db');

// Проверяем существование файла БД
if (!fs.existsSync(dbPath)) {
  console.log('Database file not found, creating new...');
  fs.closeSync(fs.openSync(dbPath, 'w')); // Создаем пустой файл
}

// Подключение к базе данных с флагом CREATE
const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, // Добавляем OPEN_CREATE
  (err) => {
    if (err) {
      console.error('Database connection error:', err.message);
      console.error('Full path attempted:', dbPath); // Логируем полный путь
    } else {
      console.log('Successfully connected to SQLite database at:', dbPath);
      
      // Проверяем доступность БД простым запросом
      db.get("SELECT name FROM sqlite_master WHERE type='table'", (err, row) => {
        if (err) {
          console.error('Database test query failed:', err.message);
        } else {
          console.log('Database test successful. Tables exist:', row ? 'Yes' : 'No');
        }
      });
    }
  }
);

// Обертка для работы с промисами
module.exports = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('SQL Error:', err.message); // Логируем ошибки запросов
        console.error('For query:', sql);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};