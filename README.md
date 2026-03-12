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



## Project Structure

```text

STOCK_REACT_MICROSERVICE
└─ src
   ├─ app
   │  └─ router.tsx
   │     React Router 路由設定，定義 URL 對應的頁面
   │
   ├─ components
   │  UI 元件層（只負責畫畫面）
   │
   │  ├─ chart
   │  │  └─ CandleChart.tsx
   │  │     K 線圖元件，使用 lightweight-charts 繪製 K 線
   │  │
   │  ├─ market
   │  │  ├─ CompanyPanel.tsx
   │  │  │  顯示公司資訊（名稱、交易所、IPO、Logo、Website）
   │  │  ├─ MetricPanel.tsx
   │  │  │  顯示財務指標（PE、EPS、PB、Dividend Yield）
   │  │  ├─ NewsPanel.tsx
   │  │  │  顯示股票相關新聞
   │  │  ├─ PricePanel.tsx
   │  │  │  顯示即時股價
   │  │  └─ RecommendationPanel.tsx
   │  │     顯示分析師建議（BUY / HOLD /
   │  │     SELL）
   │  │
   │  └─ search
   │     └─ SymbolSearch.tsx
   │        股票搜尋元件，輸入股票代碼後切換 Dashboard 資料
   │
   ├─ hooks
   │  React 自訂 Hook（資料邏輯層）
   │
   │  ├─ useCandles.ts
   │  │  取得 K 線資料，呼叫 candleService API
   │  ├─ useMarketData.ts
   │  │  取得市場資料（公司資訊、metrics、news、recommendation）
   │  └─ usePriceStream.ts
   │     訂閱 WebSocket 即時價格
   │
   ├─ pages
   │  └─ DashboardPage.tsx
   │     主儀表板頁面，整合各 UI 元件
   │
   ├─ services
   │  API 呼叫層
   │
   │  ├─ candleService.ts
   │  │  呼叫 Candle Microservice API 取得 K 線資料
   │  └─ quoteService.ts
   │     呼叫 Quote Microservice API 取得市場資料
   │
   ├─ types
   │  └─ market.ts
   │     TypeScript 型別定義（Price、Company、Metric、Recommendation、News）
   │
   ├─ App.tsx
   │  React 應用程式入口，載入 Router
   │
   ├─ main.tsx
   │  React 初始化並掛載 App
   │
   ├─ index.css
   │  全域樣式
   │
   ├─ index.html
   │  Vite 前端入口 HTML
   │
   ├─ eslint.config.js
   │  ESLint 程式碼品質檢查設定
   │
   ├─ vite.config.ts
   │  Vite 建置工具設定
   │
   ├─ tsconfig.json
   ├─ tsconfig.app.json
   ├─ tsconfig.node.json
   │
   ├─ package.json
   ├─ package-lock.json
   └─ README.md


