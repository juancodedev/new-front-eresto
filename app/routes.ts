import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/home.tsx"),
    // route('table/:id', './pages/Home/table/page.tsx'),

    route('admin', './pages/admin/adminHome.tsx', [
        index('./pages/admin/home/page.tsx'),
        route('users', './pages/admin/users/page.tsx'),
        // route('tables', './pages/admin/tables/page.tsx'),

    // // route('admin', './pages/Admin/page.tsx', [
    //     route("dashboard", "./pages/Admin/Dashboard/page.tsx"),
    //     route("tables", "./pages/Admin/Tables/page.tsx"),
    //     route("orders", "./pages/Admin/Orders/page.tsx"),
    //     route('categories', './pages/Admin/Categories/page.tsx'),
    //     route("payment-history", "./pages/Admin/PaymentHistory/page.tsx"),
    //     route("products", "./pages/Admin/Products/page.tsx"),
    //     route("users", "./pages/Admin/Users/page.tsx"),

    ]),


] satisfies RouteConfig;
