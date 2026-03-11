// 匯入 Price 型別
// Price 包含 symbol / price / timestamp / volume 等欄位
import type { Price } from "../../types/market";

/**
 * 即時價格面板
 * 顯示股票即時價格資訊
 */
export default function PricePanel({ price }: { price: Price }) {
    // 將 timestamp 轉換為 Date 物件
    const date = new Date(price.timestamp);

    return (
        <div
            style={{
                padding: 16,
                marginBottom: 16,
                background: "#0f172a",
                borderRadius: 10
            }}
        >

            {/* 股票代號 */}
            <div
                style={{
                    fontSize: 14,
                    opacity: 0.7
                }}
            >
                {price.symbol}
            </div>

            {/* 即時價格 */}
            <div
                style={{
                    fontSize: 42,
                    fontWeight: 700,
                    color: "#22c55e"
                }}
            >
                {price.price.toFixed(2)}
            </div>

            {/* 更新時間 */}
            <div
                style={{
                    fontSize: 12,
                    opacity: 0.6
                }}
            >
                {date.toLocaleString()}
            </div>

        </div>
    );
}