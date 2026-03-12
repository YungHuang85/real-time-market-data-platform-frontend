React dashboard for real-time stock and cryptocurrency market data visualization.
The application receives streaming market data via WebSocket and renders live prices, candlestick charts, and company information in a responsive dashboard.
Built to work with a Spring Boot microservices backend powered by Apache Kafka event streaming.

  #Features
  
    Real-Time Market Price
    WebSocket streaming market prices
    Dynamic symbol subscription
    Live price updates without page refresh
    Candlestick Chart
    Historical K-line data visualization
    Interactive financial chart
    Supports multiple time ranges
    Company Information
    Company profile
    Market metrics
    IPO date and company details
    Analyst Recommendation
    Buy / Hold / Sell statistics
    Visualized analyst sentiment
    Market News
    Latest market news for selected symbol
    External news API integration


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

Project Structure
src
├─ app
│  └─ router.tsx
│     React Router configuration, defines application routes
│
├─ components
│  Reusable UI components
│
│  ├─ chart
│  │  └─ CandleChart.tsx
│  │     Candlestick chart component using lightweight-charts
│  │
│  ├─ market
│  │  ├─ CompanyPanel.tsx
│  │  │     Displays company profile information
│  │  │
│  │  ├─ MetricPanel.tsx
│  │  │     Displays financial metrics (PE, EPS, PB, Dividend Yield)
│  │  │
│  │  ├─ NewsPanel.tsx
│  │  │     Displays market news related to the selected symbol
│  │  │
│  │  ├─ PricePanel.tsx
│  │  │     Displays real-time market price
│  │  │
│  │  └─ RecommendationPanel.tsx
│  │        Displays analyst recommendation (BUY / HOLD / SELL)
│  │
│  └─ search
│     └─ SymbolSearch.tsx
│        Search input for selecting market symbols
│
├─ hooks
│  Custom React hooks responsible for data logic
│
│  ├─ useCandles.ts
│  │     Fetch candlestick data from Candle microservice
│  │
│  ├─ useMarketData.ts
│  │     Fetch company info, metrics, recommendations and news
│  │
│  └─ usePriceStream.ts
│        Subscribe to real-time market prices via WebSocket
│
├─ pages
│  └─ DashboardPage.tsx
│     Main dashboard page combining all UI components
│
├─ services
│  API communication layer
│
│  ├─ candleService.ts
│  │     Fetch historical candlestick data
│  │
│  └─ quoteService.ts
│        Fetch market data and subscribe symbol streams
│
├─ types
│  └─ market.ts
│     TypeScript interfaces for market data models
│
├─ App.tsx
│  React application root component
│
├─ main.tsx
│  Application entry point that mounts React to the DOM
│
└─ index.css
   Global styles
