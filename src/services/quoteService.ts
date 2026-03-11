// Quote Service API 位址
// 這個微服務負責股票即時行情訂閱與資料推送
const QUOTE_SERVICE = "http://localhost:8081";

// 訂閱股票 Symbol 的 API
// symbol：股票或交易對，例如 AAPL / NVDA / BINANCE:BTCUSDT
export async function subscribeSymbol(symbol: string) {

    // 呼叫 Quote Service 的 REST API
    // endpoint: POST /api/quote/subscribe/{symbol}
    // 功能：通知後端開始訂閱該股票的即時行情
    const res = await fetch(`${QUOTE_SERVICE}/api/quote/subscribe/${symbol}`, {
        // 使用 POST 方法，代表建立一個新的訂閱
        method: "POST",
    });

    // 如果 HTTP status 不是 200~299
    if (!res.ok) {
        // 讀取後端回傳的錯誤訊息並拋出例外
        // 讓呼叫方 (例如 SymbolSearch) 可以捕捉錯誤
        throw new Error(await res.text());
    }

    // 回傳後端回應文字
    // 例如 "subscribed NVDA"
    return res.text();
}