# AI Loan Eligibility Checker (BFSI)
Loan Eligibility, Credit Score Analyzer, EMI Calculator and AI Financial Tips. Dark glassmorphism UI, Claude AI, Google Sheets storage.

## Structure
- `public/` frontend (HTML, CSS, JS)
- `server.js` Node/Express backend (Claude proxy + Sheets proxy; keys stay server-side)
- `apps-script/Code.gs` Google Sheets backend

## Setup
1. Google Sheet > Extensions > Apps Script > paste `Code.gs`, set `SECRET` > Deploy > Web app (Execute as: Me, Access: Anyone) > copy URL.
2. `cp .env.example .env` and fill in ANTHROPIC_API_KEY (console.anthropic.com), SHEET_URL, SHEET_SECRET.
3. `npm install && npm start` then open http://localhost:3000

## Push to GitHub
```
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-loan-checker.git
git push -u origin main
```
`.env` is git-ignored, so never commit keys.

## Deploy (GitHub Pages can't run Node)
Render.com > New Web Service > connect repo > Build `npm install`, Start `npm start` > add the 4 env vars.

## Tests
Try: EMI 5,00,000 @10.5% for 5 yrs ~ ₹10,747; age 17 / score 1000 / empty fields show validation errors.
