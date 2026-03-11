// 匯入 Company 型別
// 定義公司基本資料的結構 (name / exchange / logo / ipo 等)
import type { Company } from "../../types/market";

// CompanyPanel 元件
// 功能：顯示公司基本資訊 (Logo / 公司名稱 / 交易所 / 國家 / IPO)
export default function CompanyPanel({ company }: { company: Company }) {

    // 處理公司網站 URL
    // 如果 weburl 已經包含 http / https 就直接使用
    // 如果沒有協定 (例如 nvidia.com) 則自動補上 https://
    // 如果 weburl 為空則回傳空字串
    const website = company.weburl?.startsWith("http")
        ? company.weburl
        : company.weburl
            ? `https://${company.weburl}`
            : "";

    return (

        // 外層容器
        // 顯示為深色卡片樣式
        <div
            style={{
                padding: 12,    // 內距
                background: "#111827",  // 深色背景
                borderRadius: 10,   // 圓角
                marginBottom: 12    // 與下方區塊間距
            }}
        >
            {/* 公司資訊區 */}
            <div style={{ display: "flex", gap: 12 }}>

                {/* 公司 Logo */}
                {/* 若 API 有回傳 logo 才顯示 */}
                {company.logo && (
                    <img
                        src={company.logo}  // Logo URL
                        width={90}  // 寬度
                        height={90} // 高度
                        style={{ borderRadius: 6 }}
                        alt={company.name}  // 無障礙描述
                    />
                )}

                {/* 公司文字資訊 */}
                <div>
                    {/* 公司名稱 + 官方網站 icon */}
                    <div
                        style={{
                            fontWeight: 700,    // 粗體
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                        }}
                    >
                        {/* 公司名稱 */}
                        {company.name}

                        {/* 官方網站連結 */}
                        {/* 如果 website 有值才顯示 */}
                        {website && (
                            <a
                                href={website}  // 公司網站
                                target="_blank" // 新分頁開啟
                                rel="noopener noreferrer"   // 安全設定
                                title="Company Website" // 滑鼠提示
                                style={{
                                    fontSize: 14,
                                    textDecoration: "none"
                                }}
                            >
                                🌐
                            </a>
                        )}
                    </div>

                    {/* 交易所與國家 */}
                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                        {company.exchange} | {company.country}
                    </div>

                </div>

            </div>

            {/* IPO 資訊 */}
            <div style={{ fontSize: 12, marginTop: 8 }}>
                IPO: {company.ipo}
            </div>

        </div>
    );
}