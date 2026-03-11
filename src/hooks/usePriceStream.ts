// React hooks
// useState：管理價格狀態
// useEffect：處理副作用 (API / WebSocket)
// useRef：保存可變值但不觸發 re-render
import { useEffect, useRef, useState } from "react";
// STOMP client，用來連接 Spring Boot WebSocket
import { Client } from "@stomp/stompjs";
// Price 型別定義 (symbol / price / volume / timestamp)
import type { Price } from "../types/market";

// WebSocket Gateway, Spring Boot 通常會透過 STOMP endpoint 提供 /ws
const WS = "ws://localhost:8080/ws";
// REST API Gateway, 用來取得 snapshot price
const API = "http://localhost:8080/api";

// 字串標準化工具功能：去空白 + 轉大寫, 例如 mu → MU
function normalize(s: string) {
    return (s ?? "").trim().toUpperCase();
}

// 自訂 Hook：usePriceStream
// 功能：取得股票即時價格
export function usePriceStream(symbol: string) {
    // 最新價格 state
    const [price, setPrice] = useState<Price | null>(null);

    // 保存最新 symbol
    // useRef 不會觸發 re-render
    // 用來讓 WebSocket callback 可以取得最新 symbol
    const symbolRef = useRef("");

    // 當 symbol 改變時更新 ref
    useEffect(() => {
        symbolRef.current = normalize(symbol);
    }, [symbol]);

    // Step1：取得 snapshot price
    // WebSocket 可能還沒收到資料
    // 所以先用 REST API 拿一次最新價格
    useEffect(() => {

        if (!symbol) return;

        fetch(`${API}/price/${encodeURIComponent(symbol)}`)
            .then(r => r.json())
            .then(data => {
                if (data) {
                    console.log("SNAPSHOT", data);  // debug log
                    setPrice(data);  // 更新價格
                }
            })
            .catch(console.error);

    }, [symbol]);

    // Step2：建立 WebSocket 連線
    // 只會建立一次
    useEffect(() => {

        const client = new Client({
            // Spring Boot STOMP WebSocket endpoint
            brokerURL: WS,
            // 如果連線中斷，每 5 秒自動重連
            reconnectDelay: 5000,
            // WebSocket 連線成功
            onConnect: () => {

                console.log("WS CONNECTED");
                // 訂閱價格 topic
                client.subscribe("/topic/price", (msg) => {
                    // 解析訊息
                    const data: Price = JSON.parse(msg.body);

                    const incoming = normalize(data.symbol);
                    const current = symbolRef.current;

                    console.log("WS PRICE", data);

                    if (!current) return;

                    // 支援多種 symbol 格式
                    // MU
                    // NASDAQ:MU
                    // BINANCE:BTCUSDT
                    if (
                        incoming === current ||
                        incoming.endsWith(current) ||
                        current.endsWith(incoming)
                    ) {
                        setPrice(data);  // 更新價格
                    }

                });

            }
        });

        // 啟動 WebSocket client
        client.activate();

        // component unmount 時關閉連線
        return () => {
            client.deactivate();
        };

    }, []); // 空 dependency → 只執行一次

    return price;   // 回傳最新價格
}