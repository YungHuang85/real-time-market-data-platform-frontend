// 匯入 Recommendation 型別 (定義在 types/market.ts)
// 用來描述分析師建議數據，例如 buy / hold / sell 數量
import type { Recommendation } from "../../types/market";

// RecommendationPanel 元件
// 用來顯示股票分析師建議統計 (Buy / Hold / Sell)
export default function RecommendationPanel({
    recommendation
}: {
    // props 型別宣告
    // recommendation 物件必須符合 Recommendation 型別
    recommendation: Recommendation
}) {

    return (
        // 外層容器
        // 使用深色背景並用 flex 排列三個建議欄位
        <div
            style={{
                padding: 12,    // 內距
                background: "#111827",  // 深色背景
                borderRadius: 10,   // 圓角
                marginBottom: 12,   // 與下方區塊間距
                display: "flex",    // 水平排列
                gap: 20 // 元素間距
            }}
        >

            {/* BUY 建議數量 */}
            {/* 綠色通常代表看多 / 買入 */}
            <div style={{ color: "#00ff9d", fontWeight: 700 }}>
                BUY {recommendation.buy}
            </div>

            {/* HOLD 建議數量 */}
            {/* 持有觀望，使用預設顏色 */}
            <div>
                HOLD {recommendation.hold}
            </div>

            {/* SELL 建議數量 */}
            {/* 紅色通常代表看空 / 賣出 */}
            <div style={{ color: "#ff6b6b", fontWeight: 700 }}>
                SELL {recommendation.sell}
            </div>

        </div>
    );
}