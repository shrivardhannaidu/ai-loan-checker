require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json({ limit: '20kb' }));
app.use(express.static('public'));

// Claude proxy: API key stays on the server, never in the browser
app.post('/api/ai', async (req, res) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: process.env.MODEL || 'claude-sonnet-5-5', max_tokens: 700,
        system: 'You are a careful BFSI assistant for Indian users. Give concise, practical, non-binding guidance in short bullet points. Use INR.',
        messages: [{ role: 'user', content: String(req.body.prompt || '').slice(0, 2500) }]
      })
    });
    const d = await r.json();
    res.json({ text: (d.content || []).map(c => c.text || '').join('') || (d.error && d.error.message) || 'No response' });
  } catch (e) { res.status(500).json({ text: 'AI service error. Check your API key.' }); }
});

// Google Sheets via Apps Script web app
app.post('/api/records', async (req, res) => {
  try {
    const r = await fetch(process.env.SHEET_URL, { method: 'POST', headers: { 'content-type': 'text/plain' },
      body: JSON.stringify({ ...req.body, secret: process.env.SHEET_SECRET }) });
    res.json(await r.json());
  } catch (e) { res.status(500).json({ ok: false }); }
});
app.get('/api/records', async (req, res) => {
  try {
    const r = await fetch(`${process.env.SHEET_URL}?secret=${encodeURIComponent(process.env.SHEET_SECRET)}`);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ rows: [] }); }
});

app.listen(process.env.PORT || 3000, () => console.log('Running on http://localhost:' + (process.env.PORT || 3000)));
