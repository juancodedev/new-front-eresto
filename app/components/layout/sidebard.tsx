import { BarChart, ClipboardList, UtensilsCrossed, History, Grid2X2, Package, Users, LogOut} from 'lucide-react'
import { Link } from 'react-router';
import { useLocation } from "react-router-dom";
import { SiTablecheck } from 'react-icons/si';
import { Button } from "../ui/button"
import { useAuthContext } from "../../components/auth/auth-provider"


const navItems = [
    { href: 'dashboard', label: 'Dashboard', icon: BarChart },
    { href: 'orders', label: 'Pedidos', icon: ClipboardList },
    { href: 'tables', label: 'Mesas', icon: SiTablecheck },
    { href: 'payment-history', label: 'Histórial de pagos', icon: History },
    { href: 'categories', label: 'Categorías', icon: Grid2X2 },
    { href: 'products', label: 'Productos', icon: Package },
    { href: 'users', label: 'Usuarios', icon: Users },

    // { name: 'Dashboard',icon: 'DashboardIcon',to: '/admin',},
    // {
    //     name: 'Users',
    //     icon: 'UsersIcon',
    //     to: '/admin/users',
    // },
    // {
    //     name: 'Products',
    //     icon: 'ProductsIcon',
    //     to: '/admin/products',
    // },
    // {
    //     name: 'Orders',
    //     icon: 'OrdersIcon',
    //     to: '/admin/orders',
    // },
    // {
    //     name: 'Settings',
    //     icon: 'SettingsIcon',
    //     to: '/admin/settings',
    // },
]
export function Sidebar() {
    const pathname = useLocation()
    const { logout, user } = useAuthContext()
    return (
        <aside className="w-64 bg-white border-r h-screen flex flex-col">
            <div className="p-4 border-b">
                <Link to='/admin'>
                    <h1 className="text-xl font-semibold text-gray-800">iCard Admin</h1>
                </Link>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname.pathname === item.href
                        return (
                            <li key={item.href}>
                                <Link
                                    to={item.href}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-100"
                                }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className="p-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Conectado como: {user?.username}</p>
                <Button onClick={logout} variant="outline" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                </Button>
            </div>
        </aside>
    )
}

