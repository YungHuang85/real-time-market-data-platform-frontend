// React 的 StrictMode
// 開發模式下會啟用額外檢查，幫助發現潛在問題
// 例如：不安全的 lifecycle、重複 side effect 等
import { StrictMode } from 'react'
// React 18 新的 root API
// createRoot 用來建立 React 應用的渲染根節點
import { createRoot } from 'react-dom/client'
// 全域 CSS
// 會套用到整個 React 應用
import './index.css'
// 應用程式的根元件
// 內部會包含 RouterProvider 與所有頁面
import App from './App.tsx'

// 取得 HTML 中 id="root" 的 DOM 節點
// 這個節點通常定義在 index.html
// `!` 是 TypeScript 的 non-null assertion
// 表示這個元素一定存在
createRoot(document.getElementById('root')!).render(
  // StrictMode 只在開發模式啟用
  // 會幫助偵測潛在問題，但不會影響 production
  <StrictMode>
    {/* React 應用的入口元件 */}
    <App />
  </StrictMode>,
)
