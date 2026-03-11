// React hooks
// useState：用來管理 state
// useEffect：在特定條件改變時執行副作用 (例如 API 呼叫)
import { useEffect, useState } from "react";
// 呼叫 backend API 的 service
// 功能：向後端取得某個股票的 K 線資料
import { fetchCandles } from "../services/candleService";
// Candle 型別定義
// 描述一筆 K 線資料 (open / high / low / close / time)
import type { Candle } from "../types/market";

// 自訂 Hook：useCandles
// 功能：依據 symbol 取得對應的 K 線資料
export function useCandles(symbol: string) {

    // 儲存 K 線資料的 state
    // 預設為空陣列
    const [candles, setCandles] = useState<Candle[]>([]);

    // 當 symbol 改變時執行
    useEffect(() => {
        // 如果 symbol 為空則不呼叫 API
        if (!symbol) return;

        // 呼叫後端 API 取得 K 線
        // 成功 → 更新 state; 失敗 → 印出錯誤
        fetchCandles(symbol).then(setCandles).catch(console.error);
    }, [symbol]);  // 依賴 symbol，symbol 改變時重新執行

    return candles;  // 回傳 candles 給使用這個 hook 的元件
}