const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require('../db');

router.get('/groups', async (req, res) => {
  try {
    const sql = fs.readFileSync(
      path.join(process.env.BASEDIR, 'sql', 'groups.sql')
    ).toString();
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/metrics', async (req, res) => {
  try {
    const sql = fs.readFileSync(
      path.join(process.env.BASEDIR, 'sql', 'metrics.sql')
    ).toString();
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Все ноды
router.get('/nodes', async (req, res) => {
  try {
    const sql = 'SELECT * FROM nodes';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Интерфейсы
router.get('/interfaces', async (req, res) => {
  try {
    const sql = 'SELECT * FROM interfaces';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Статусы
router.get('/statuses', async (req, res) => {
  try {
    const sql = 'SELECT * FROM statuses';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Пользователи
router.get('/users', async (req, res) => {
  try {
    const sql = 'SELECT * FROM users';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Связи групп и нод
router.get('/groups_nodes', async (req, res) => {
  try {
    const sql = 'SELECT * FROM groups_nodes';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Приложения на конкретной ноде
router.get('/applications', async (req, res) => {
  try {
    const sql = 'SELECT * FROM applications';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;