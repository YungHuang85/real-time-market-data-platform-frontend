// =============================
// 即時價格資料型別
// =============================
// 用於 WebSocket / 即時行情 API

export type Price = {
    // 股票或交易對代號
    // 例如：NVDA / AAPL / BINANCE:BTCUSDT
    symbol: string;
    price: number;  // 最新成交價格
    timestamp: number;  // 時間戳 (Unix timestamp，毫秒)
    volume: number; // 成交量
};

// =============================
// 公司基本資料
// =============================
// 來源通常是 Finnhub / 公司資料 API
export type Company = {
    name: string;   // 公司名稱
    ticker: string; // 股票代號
    exchange: string;   // 交易所:例如 NASDAQ / NYSE
    ipo: string;    // IPO 上市日期
    marketCapitalization: number;   // 市值 (Market Cap)
    weburl: string; // 公司官方網站
    logo: string;   // 公司 Logo 圖片 URL
    country?: string;   //公司所在國家
};

// =============================
// 財務指標
// =============================
// 常見股票估值指標
export type Metric = {
    pe: number; // 本益比 (Price / Earnings)
    eps: number;    // 每股盈餘 (Earnings Per Share)
    pb: number; // 股價淨值比 (Price / Book)
    dividendYield: number;  // 股息殖利率
};

// =============================
// 分析師評級
// =============================
// 市場分析師對股票的建議
export type Recommendation = {
    buy: number;    // 建議買入的分析師數量
    hold: number;   // 建議持有的分析師數量
    sell: number;   // 建議賣出的分析師數量
    period: string; // 評級期間: 例如：2024-03
};

// =============================
// 新聞資料
// =============================
// 與股票相關的新聞資訊
export type News = {
    headline: string;   // 新聞標題
    source: string; // 新聞來源
    url: string;    // 新聞連結
    datetime: number;   // 發布時間
    summary: string;    // 新聞摘要
};

// =============================
// K線資料
// =============================
// 用於繪製 Candlestick Chart
export type Candle = {
    time: number;   // K線時間
    open: number;   // 開盤價 (Open)
    high: number;   // 最高價 (High)
    low: number;    // 最低價 (Low)
    close: number;  // 收盤價 (Close)
};