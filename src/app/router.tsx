// 從 react-router-dom 匯入 createBrowserRouter
// 用來建立前端 SPA (Single Page Application) 的路由系統
import { createBrowserRouter } from "react-router-dom";
// 匯入首頁頁面元件 (Dashboard)
// 這個元件會在 "/" 路徑時被渲染
import DashboardPage from "../pages/DashboardPage";

// 建立並匯出 Router 物件
// 這個 router 會在 React App 的入口 (通常 main.tsx / App.tsx)
// 透過 <RouterProvider router={router} /> 使用
export const router = createBrowserRouter([
    {
        // URL 路徑
        // "/" 代表網站首頁 (root path)
        path: "/",
        // 對應要渲染的 React 元件
        // 當使用者進入 http://localhost:5173/
        // React Router 會載入 DashboardPage
        element: <DashboardPage />,
    },
]);