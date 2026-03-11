// React hooks
// useState：管理元件狀態
// useEffect：在依賴變數改變時執行副作用 (例如 API 呼叫)
import { useEffect, useState } from "react";
// 匯入市場資料型別定義
// Company：公司基本資料
// Metric：財務指標
// Recommendation：分析師評級
// News：新聞資料
import type { Company, Metric, Recommendation, News } from "../types/market";

// 後端 API Gateway 位址
// 所有市場資料 API 都透過這個 base URL 呼叫
const API = "http://localhost:8081/api";

// 安全解析 JSON 的工具函式
// 目的：避免 API 回傳空內容或錯誤格式時造成程式崩潰
async function safeJson(res: Response) {

    // 如果 HTTP status 不是 200~299
    // 直接回傳 null
    if (!res.ok) return null;
    // 先讀取文字
    const text = await res.text();
    // 如果回傳是空字串
    if (!text) return null;

    try {
        return JSON.parse(text);  // 嘗試解析 JSON
    } catch {
        return null;  // JSON 格式錯誤
    }

}

// 自訂 Hook：useMarketData
// 功能：取得某股票的完整市場資料
export function useMarketData(symbol: string) {
    // 公司基本資訊
    const [company, setCompany] = useState<Company | null>(null);
    // 財務指標 (PE / EPS / PB / Dividend Yield 等)
    const [metric, setMetric] = useState<Metric | null>(null);
    // 分析師建議 (BUY / HOLD / SELL)
    const [recommendation, setRecommendation] =
        useState<Recommendation | null>(null);
    // 新聞列表
    const [news, setNews] = useState<News[]>([]);

    // 當 symbol 改變時重新載入資料
    useEffect(() => {
        // 如果沒有 symbol 就不呼叫 API
        if (!symbol) return;
        // 非同步載入資料
        async function load() {

            try {
                // 同時呼叫四個 API (並行)
                // Promise.all 可以提升效能
                const [companyRes, metricRes, recRes, newsRes] =
                    await Promise.all([
                        // 公司資料
                        fetch(`${API}/company/${symbol}`),
                        // 財務指標
                        fetch(`${API}/metric/${symbol}`),
                        // 分析師評級
                        fetch(`${API}/recommendation/${symbol}`),
                        // 新聞
                        fetch(`${API}/news/${symbol}`)

                    ]);

                // 使用 safeJson 安全解析 JSON
                const c = await safeJson(companyRes);
                const m = await safeJson(metricRes);
                const r = await safeJson(recRes);
                const n = await safeJson(newsRes);

                // 更新 state
                if (c) setCompany(c);
                if (m) setMetric(m);
                if (r) setRecommendation(r);
                if (n) setNews(n);

            } catch (err) {
                // API 呼叫失敗
                console.error("MarketData error", err);

            }

        }
        // 執行資料載入
        load();

    }, [symbol]);   // 依賴 symbol

    // 回傳所有市場資料
    // React component 可以直接使用
    return {
        company,
        metric,
        recommendation,
        news
    };

}