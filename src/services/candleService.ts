// Candle Service API 位址
// 這個微服務專門提供 K 線資料
const CANDLE_SERVICE = "http://localhost:8082";

// 取得 K 線資料的 API 函式
// symbol：股票或幣別代號，例如 AAPL / NVDA / BTCUSDT
export async function fetchCandles(symbol: string) {

    // 呼叫後端 Candle Service
    // REST API endpoint: /api/candles/{symbol}
    const res = await fetch(`${CANDLE_SERVICE}/api/candles/${symbol}`);

    // 如果 HTTP status 不是 200~299
    if (!res.ok) {
        // 讀取錯誤訊息並拋出 exception
        // 讓呼叫方 (例如 useCandles hook) 可以處理錯誤
        throw new Error(await res.text());
    }
    // 解析 JSON 回傳
    // 通常格式會是 Candle[]
    return res.json();
}