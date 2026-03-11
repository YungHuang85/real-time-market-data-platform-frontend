// React hook
// useState：管理目前選擇的股票 symbol
import { useState } from "react";
// 搜尋元件：使用者輸入股票代號
import SymbolSearch from "../components/search/SymbolSearch";

// 市場資料顯示元件
import PricePanel from "../components/market/PricePanel";   // 即時價格
import CandleChart from "../components/chart/CandleChart";  // K線圖

import CompanyPanel from "../components/market/CompanyPanel";   // 公司基本資料
import MetricPanel from "../components/market/MetricPanel"; // 財務指標
import RecommendationPanel from "../components/market/RecommendationPanel"; // 分析師評級
import NewsPanel from "../components/market/NewsPanel"; // 新聞列表

// 自訂 hooks
// usePriceStream：WebSocket 即時價格
// useCandles：取得 K 線資料
// useMarketData：取得公司 / 財務 / 評級 / 新聞
import { usePriceStream } from "../hooks/usePriceStream";
import { useCandles } from "../hooks/useCandles";
import { useMarketData } from "../hooks/useMarketData";

// 將 symbol 轉換成 K線 API 可接受的格式
// 例如：BINANCE:BTCUSDT → BTCUSDT
function toCandleSymbol(symbol: string) {

    // 如果是 Binance symbol
    if (symbol.startsWith("BINANCE:")) {
        return symbol.replace("BINANCE:", "");  // 移除前綴
    }

    return symbol;  // 股票 symbol 直接回傳

}

// Dashboard 主頁面
// 整個交易儀表板的入口
export default function DashboardPage() {
    // 目前選擇的股票代號
    const [symbol, setSymbol] = useState("");
    // 即時價格 (WebSocket stream)
    const price = usePriceStream(symbol);
    // K線使用不同 symbol 格式
    const candleSymbol = toCandleSymbol(symbol);
    // K線資料
    const candles = useCandles(candleSymbol);
    // 市場資料
    const {
        company,
        metric,
        recommendation,
        news
    } = useMarketData(symbol);

    return (
        <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>

            <h1 style={{
                fontSize: 35,
                fontWeight: 700,
                marginBottom: 20
            }}>
                Real-Time Market Data Platform
            </h1>
            {/* 股票搜尋框 */}
            {/* 使用者輸入 symbol 後會更新 state */}
            <SymbolSearch onSearch={setSymbol} />
            {/* 公司基本資料 */}
            {company && <CompanyPanel company={company} />}
            {/* 即時價格 */}
            {price && <PricePanel price={price} />}
            {/* 財務指標 */}
            {metric && <MetricPanel metric={metric} />}
            {/* 分析師評級 */}
            {recommendation &&
                <RecommendationPanel recommendation={recommendation} />
            }
            {/* K線圖 */}
            <CandleChart
                candles={candles}
                price={price?.price}    // 即時價格標記線
            />
            {/* 新聞 */}
            {news.length > 0 &&
                <NewsPanel news={news} />
            }

        </div>
    );
}