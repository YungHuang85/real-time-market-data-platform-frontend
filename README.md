# Real-Time Market Data Platform (Frontend)

React dashboard for real-time stock and cryptocurrency market data visualization.

This application receives streaming market data over WebSocket and displays live prices, candlestick charts, company information, analyst recommendations, and market news in a responsive dashboard.

It is designed to work with a Spring Boot microservices backend powered by Apache Kafka event streaming.

---

## Features

### Real-Time Price Streaming
- WebSocket-based live price updates
- STOMP protocol support
- Dynamic symbol subscription
- No page refresh required

### Candlestick Chart
- Historical candlestick data visualization
- Interactive chart built with Lightweight Charts
- Supports stock and crypto symbols

### Company Information
- Company profile
- Market capitalization and exchange details
- IPO date and website information

### Analyst Recommendation
- Buy / Hold / Sell statistics
- Simple sentiment visualization

### Market News
- Latest related news for the selected symbol
- External news API integration

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- Lightweight Charts

### Communication
- REST API
- WebSocket
- STOMP Protocol

### Styling
- CSS

---

## Project Structure

```text
stock_react_microservice
├─ src
│  ├─ app
│  │  └─ router.tsx                 # React Router configuration
│  ├─ components
│  │  ├─ chart
│  │  │  └─ CandleChart.tsx         # Candlestick chart component
│  │  ├─ market
│  │  │  ├─ CompanyPanel.tsx        # Company information panel
│  │  │  ├─ MetricPanel.tsx         # Financial metrics panel
│  │  │  ├─ NewsPanel.tsx           # Related news panel
│  │  │  ├─ PricePanel.tsx          # Real-time price panel
│  │  │  └─ RecommendationPanel.tsx # Analyst recommendation panel
│  │  └─ search
│  │     └─ SymbolSearch.tsx        # Symbol search component
│  ├─ hooks
│  │  ├─ useCandles.ts              # Fetch candlestick data
│  │  ├─ useMarketData.ts           # Fetch company, metrics, recommendation, and news data
│  │  └─ usePriceStream.ts          # Subscribe to the WebSocket price stream
│  ├─ pages
│  │  └─ DashboardPage.tsx          # Main dashboard page
│  ├─ services
│  │  ├─ candleService.ts           # Candle data API client
│  │  └─ quoteService.ts            # Quote subscription API client
│  ├─ types
│  │  └─ market.ts                  # Shared TypeScript types
│  ├─ App.tsx                       # Application root component
│  ├─ index.css                     # Global styles
│  └─ main.tsx                      # React entry point
├─ package.json
└─ vite.config.ts
```

---

## Backend Services

This frontend connects to backend services built with:

- Spring Boot
- Apache Kafka
- Redis
- WebSocket

Backend repository:

https://github.com/YungHuang85/real-time-market-data-platform-backend

---

## Local Development

### Prerequisites

- Node.js
- npm
- Running backend services

### Install

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The frontend expects backend services to be available locally:

- `http://localhost:8080` for WebSocket price streaming
- `http://localhost:8081` for quote, company, metric, recommendation, and news APIs
- `http://localhost:8082` for candlestick APIs

---

## Example Symbols

- NVDA
- TSLA
- BINANCE:BTCUSDT
