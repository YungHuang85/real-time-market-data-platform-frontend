import { useEffect, useRef, useState, useMemo } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

/**
 * K線資料結構
 * time 使用 unix timestamp (seconds)
 */
type Candle = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};

/**
 * K線顯示範圍
 */
type RangeKey = "ALL" | "DAY" | "MONTH" | "YEAR";

export default function CandleChart({
    candles,
    price
}: {
    candles: Candle[];
    price?: number;
}) {

    //chart DOM container
    const chartRef = useRef<HTMLDivElement | null>(null);
    //chart instance
    const chart = useRef<any>(null);
    //candlestick series instance
    const series = useRef<any>(null);
    //使用者選擇的K線時間範圍
    const [range, setRange] = useState<RangeKey>("ALL");

    // =========================
    // 篩選K線
    // =========================
    /**
     * 根據 range 篩選 K線
     * useMemo 避免每次 render 都重新計算
     */
    const filteredCandles = useMemo(() => {

        if (!candles || candles.length === 0) return [];

        const now = new Date();

        switch (range) {

            //當日K線
            case "DAY":
                return candles.filter(c => {
                    const d = new Date(c.time * 1000);
                    return (
                        d.getFullYear() === now.getFullYear() &&
                        d.getMonth() === now.getMonth() &&
                        d.getDate() === now.getDate()
                    );
                });
            //當月K線
            case "MONTH":
                return candles.filter(c => {
                    const d = new Date(c.time * 1000);
                    return (
                        d.getFullYear() === now.getFullYear() &&
                        d.getMonth() === now.getMonth()
                    );
                });
            //當年K線
            case "YEAR":
                return candles.filter(c => {
                    const d = new Date(c.time * 1000);
                    return d.getFullYear() === now.getFullYear();
                });
            //所有K線
            default:
                return candles;
        }

    }, [candles, range]);

    // =========================
    // 建立 chart
    // =========================

    useEffect(() => {

        if (!chartRef.current) return;
        //建立圖表
        const c = createChart(chartRef.current, {

            height: 500,

            layout: {
                background: { color: "#0d1117" },
                textColor: "#DDD"
            },

            grid: {
                vertLines: { color: "#2B2B43" },
                horzLines: { color: "#363C4E" }
            },

            rightPriceScale: {
                borderColor: "#485c7b"
            },

            timeScale: {
                borderColor: "#485c7b",
                timeVisible: true,
                secondsVisible: false
            }

        });

        chart.current = c;

        //建立K線 series
        series.current = c.addSeries(CandlestickSeries, {

            upColor: "#26a69a",
            downColor: "#ef5350",

            borderUpColor: "#26a69a",
            borderDownColor: "#ef5350",

            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350"

        });

        //自動resize chart
        const resize = () => {

            if (!chartRef.current) return;

            c.applyOptions({
                width: chartRef.current.clientWidth
            });

        };

        window.addEventListener("resize", resize);

        resize();

        //component unmount 清理
        return () => {
            window.removeEventListener("resize", resize);
            c.remove();
        };

    }, []);

    // =========================
    // 更新K線資料
    // =========================

    useEffect(() => {

        if (!series.current) return;

        let data: Candle[] = [];

        //優先使用篩選後K線
        if (filteredCandles.length > 0) {
            data = filteredCandles;
        }
        //若沒有K線資料,使用即時價格建立一根K線
        else if (price !== undefined) {

            const now = Math.floor(Date.now() / 1000);

            data = [{
                time: now,
                open: price,
                high: price,
                low: price,
                close: price
            }];
        }

        //更新圖表
        if (data.length > 0) {
            series.current.setData(data);
            chart.current.timeScale().fitContent();
        }

    }, [filteredCandles, price]);

    // =========================
    // UI
    // =========================

    return (

        <div>

            {/* K線時間範圍選擇 */}

            <div style={{ marginBottom: 10 }}>

                <button onClick={() => setRange("ALL")}>所有</button>
                <button onClick={() => setRange("DAY")}>當日</button>
                <button onClick={() => setRange("MONTH")}>當月</button>
                <button onClick={() => setRange("YEAR")}>當年</button>

            </div>

            <div
                ref={chartRef}
                style={{
                    width: "95vw"
                }}
            />

        </div>
    );
}