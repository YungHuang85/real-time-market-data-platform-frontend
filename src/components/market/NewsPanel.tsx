// 匯入新聞資料型別
// 定義新聞 headline / url / source / datetime 等欄位
import type { News } from "../../types/market";

//新聞列表面板,顯示股票相關新聞
export default function NewsPanel({ news }: { news: News[] }) {

    //如果沒有新聞資料就不渲染 component,避免畫面出現空區塊
    if (!news?.length) return null;

    //最多顯示 20 筆新聞,避免新聞過多造成 UI 過長
    const items = news.slice(0, 20);

    return (
        <div
            style={{
                marginTop: 20,
                padding: 12,
                background: "#111827",
                borderRadius: 10
            }}
        >
            {/* 標題 */}
            <h3 style={{ marginBottom: 10 }}>News</h3>

            <div
                style={{
                    maxHeight: 400,
                    overflowY: "auto",
                    paddingRight: 6
                }}
            >

                {items.map((n, i) => (

                    //單一新聞項目
                    <div
                        key={i}
                        style={{
                            marginBottom: 12,
                            paddingBottom: 10,
                            borderBottom: "1px solid #2b2b43"
                        }}
                    >

                        {/* 新聞標題 (可點擊連結) */}
                        <a
                            href={n.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: "#60a5fa",
                                fontWeight: 700,
                                textDecoration: "none"
                            }}
                        >
                            {n.headline}
                        </a>

                        {/* 新聞來源 */}
                        <div
                            style={{
                                fontSize: 12,
                                opacity: 0.7,
                                marginTop: 4
                            }}
                        >
                            {n.source}
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}