React dashboard for real-time stock and cryptocurrency market data visualization.  
The application receives streaming market data via WebSocket and renders live prices, candlestick charts, and company information in a responsive dashboard.

Built to work with a **Spring Boot microservices backend powered by Apache Kafka event streaming**.

---

## Features

### Real-Time Market Price
- WebSocket streaming market prices
- Dynamic symbol subscription
- Live price updates without page refresh

### Candlestick Chart
- Historical K-line data visualization
- Interactive financial chart
- Supports multiple time ranges

### Company Information
- Company profile
- Market metrics
- IPO date and company details

### Analyst Recommendation
- Buy / Hold / Sell statistics
- Visualized analyst sentiment

### Market News
- Latest market news for selected symbol
- External news API integration

---

## Tech Stack

### Frontend
- React
- TypeScript
- Lightweight Charts

### Communication
- WebSocket
- STOMP Protocol

### Styling
- CSS

---

## Project Structure

```text
STOCK_REACT_MICROSERVICE
├─ src
│   ├─ app
│   │  └─ router.tsx
│   │     React Router configuration
│   │
│   ├─ components
│   │  UI component layer
│   │  ├─ chart
│   │  │  └─ CandleChart.tsx
│   │  │     Candlestick chart component
│   │  │
│   │  ├─ market
│   │  │  ├─ CompanyPanel.tsx
│   │  │  │  Displays company information
│   │  │  ├─ MetricPanel.tsx
│   │  │  │  Displays financial metrics
│   │  │  ├─ NewsPanel.tsx
│   │  │  │  Displays related news
│   │  │  ├─ PricePanel.tsx
│   │  │  │  Displays real-time price
│   │  │  └─ RecommendationPanel.tsx
│   │  │     Displays analyst recommendation
│   │  │
│   │  └─ search
│   │     └─ SymbolSearch.tsx
│   │        Symbol search component
│   │
│   ├─ hooks
│   │  Custom React hooks for data logic
│   │  ├─ useCandles.ts
│   │  │  Fetch candlestick data
│   │  ├─ useMarketData.ts
│   │  │  Fetch company / metrics / news
│   │  └─ usePriceStream.ts
│   │     Subscribe to WebSocket price stream
│   │
│   ├─ pages
│   │  └─ DashboardPage.tsx
│   │     Main dashboard page
│   │
│   ├─ services
│   │  API communication layer
│   │  ├─ candleService.ts
│   │  │  Fetch candle data
│   │  └─ quoteService.ts
│   │     Fetch market data
│   │
│   └─ types
│     └─ market.ts
│        TypeScript interfaces
│   
├─ App.tsx
│  Application root component
│
├─ main.tsx
│  React entry point
│
└─ index.css
   Global styles
```

## Backend Microservices

This frontend connects to backend services built with:

- Spring Boot
- Apache Kafka
- Redis
- WebSocket

**Backend repository**

https://github.com/YungHuang85/real-time-market-data-platform-backend

---

## Example Symbols

- NVDA
- TSLA
- BINANCE:BTCUSDT
