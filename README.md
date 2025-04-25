# 📊 Crypto Price Tracker

A real-time crypto tracker built with **React**, **Redux Toolkit**, and **DaisyUI**, simulating live market data for popular cryptocurrencies.

## 🚀 Features

- Display real-time price updates for 5 major cryptocurrencies
- Simulated WebSocket updates using `setInterval`
- Clean, responsive UI using **DaisyUI + Tailwind CSS**
- Color-coded % changes for better visual feedback
- 7D performance chart placeholder (easily extendable)

## 🔧 Tech Stack

- **React** – Frontend framework
- **Redux Toolkit** – Global state management
- **Tailwind CSS** + **DaisyUI** – Styling

## 🖥️ UI Layout

| # | Logo | Name | Symbol | Price | 1h % | 24h % | 7d % | Market Cap | 24h Volume | Circulating Supply | 7D Chart |
|---|------|------|--------|-------|------|--------|------|-------------|--------------|----------------------|------------|

## 🔄 Simulated Real-Time Updates
- Every 1.5 seconds, random updates are dispatched via Redux to simulate price and volume changes.
- No local state used — everything is handled via Redux state and selectors.

## 🧠 Architecture

```
React
├── Redux Provider
│   └── Asset Slice (state, reducer)
├── useSelector (read asset state)
├── useDispatch (dispatch updates)
└── CryptoTable Component (UI)
```

## 📦 Installation

```bash
git clone https://github.com/ii-shimul/jobtask-xivtech
cd jobtask-xivtech
yarn
yarn dev
```

## ✅ Bonus Suggestions (Not implemented but possible)

- Integrate real WebSocket API (e.g., Binance)
- Sorting/filtering (Top gainers, etc.)
- Persist state with `localStorage`
- Add unit tests for Redux logic
- TypeScript conversion
