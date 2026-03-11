// 匯入 Metric 型別定義
// 用來描述公司的基本面指標資料
import type { Metric } from "../../types/market";

/**
 * 公司基本面指標面板
 * 顯示 PE / EPS / PB / 股利殖利率
 */
export default function MetricPanel({ metric }: { metric: Metric }) {

    return (
        /**
         * 指標容器
         * 使用 flex 讓指標水平排列
         */
        <div
            style={{
                padding: 12,
                background: "#111827",
                borderRadius: 10,
                marginBottom: 12,
                display: "flex",
                gap: 20  // 指標之間的間距
            }}
        >
            {/* 本益比 (Price/Earnings Ratio) */}
            <div>PE: {metric.pe}</div>
            {/* 每股盈餘 (Earnings Per Share) */}
            <div>EPS: {metric.eps}</div>
            {/* 股價淨值比 (Price/Book Ratio) */}
            <div>PB: {metric.pb}</div>
            {/* 股利殖利率 (Dividend Yield) */}
            <div>
                Dividend: {(metric.dividendYield * 100).toFixed(2)}%
            </div>

        </div>
    );
}