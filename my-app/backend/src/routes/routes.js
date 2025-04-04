const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db'); 

const router = express.Router();

// Роут для получения групп
router.get('/groups', async (req, res) => {
  try {
    const sql = fs.readFileSync(
      path.join(process.env.BASEDIR, 'sql', 'groups.sql'),
      'utf-8'
    );
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    console.error('Error in /groups:', err);
    res.status(500).json({ error: err.message });
  }
});

// Роут для получения метрик
router.get('/metrics', async (req, res) => {
  try {
    const sql = fs.readFileSync(
      path.join(process.env.BASEDIR, 'sql', 'metrics.sql'),
      'utf-8'
    );
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    console.error('Error in /metrics:', err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/nodes', async (req, res) => {
  try {
    const sql = 'SELECT * FROM nodes';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/interfaces', async (req, res) => {
  try {
    const sql = 'SELECT * FROM interfaces';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/statuses', async (req, res) => {
  try {
    const sql = 'SELECT * FROM statuses';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const sql = 'SELECT * FROM users';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/groups_nodes', async (req, res) => {
  try {
    const sql = 'SELECT * FROM groups_nodes';
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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