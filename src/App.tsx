// React Router 提供的元件
// RouterProvider 用來將 router 設定注入整個 React 應用
// 讓所有頁面都可以使用路由功能
import { RouterProvider } from "react-router-dom";

// 匯入自訂的 router 設定
// router 通常定義在 app/router.ts
// 裡面會設定各個 URL 對應的頁面元件
import { router } from "./app/router";

// React 應用程式的根元件 (Root Component)
// 所有頁面都會從這裡開始
export default function App() {
  // RouterProvider 會根據 URL
  // 自動渲染對應的頁面
  return <RouterProvider router={router} />;
}