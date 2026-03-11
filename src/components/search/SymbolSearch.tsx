// useState：用來管理輸入框的狀態（使用者輸入的股票代號）
import { useState } from "react";
// 呼叫後端服務訂閱股票, subscribeSymbol 會通知後端開始追蹤該股票並推送即時資料
import { subscribeSymbol } from "../../services/quoteService";

// SymbolSearch 元件
// onSearch：父元件傳入的 callback，用於通知目前選擇的股票
export default function SymbolSearch({
    onSearch,
}: {
    onSearch: (symbol: string) => void;
}) {
    // input 狀態：儲存使用者輸入的股票代號
    const [input, setInput] = useState("");
    // 搜尋按鈕觸發的邏輯
    const handleSearch = async () => {
        // 去除前後空白並轉成大寫（股票代號通常為大寫）
        const symbol = input.trim().toUpperCase();
        // 若輸入為空則直接返回
        if (!symbol) return;

        try {
            // 呼叫後端 API 訂閱該股票
            // 後端會開始透過 WebSocket / Kafka 等機制推送即時價格
            await subscribeSymbol(symbol);
            // 通知父元件目前選擇的股票
            // 例如 Dashboard 會依此更新圖表與資料
            onSearch(symbol);

        } catch (err) {
            // 若訂閱失敗則輸出錯誤訊息
            console.error("subscribe failed", err);

        }
    };

    return (
        // 搜尋區塊容器
        <div
            style={{
                marginBottom: 20,
                display: "flex",
                gap: 10
            }}
        >
            {/* 股票代號輸入框 */}
            <input
                // 綁定輸入值
                value={input}
                // 當使用者輸入時更新 state
                onChange={(e) => setInput(e.target.value)}
                // 提示可輸入的格式
                placeholder="AAPL / NVDA / BINANCE:ETHUSDT"
                // UI 樣式
                style={{
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "1px solid #333",
                    background: "#111827",
                    color: "#fff",
                    width: 240
                }}
            />
            {/* 搜尋按鈕 */}
            <button
                // 點擊後執行搜尋
                onClick={handleSearch}
                style={{
                    padding: "8px 16px"
                }}
            >
                SEARCH
            </button>

        </div>
    );
}