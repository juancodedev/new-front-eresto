import { Sidebar } from '../../components/layout/sidebard';
import { Outlet } from "react-router";
import { AuthProvider } from "../../components/auth/auth-provider"
import TrackedOutlet from '../../components/TrackedOutlet'

const AdminLayout: React.FC = () => {
    return (
        <AuthProvider>
            <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-8 overflow-auto">
                        {/* <Outlet /> */}
                        <TrackedOutlet />
                    </main>
                </div>
            </div>
        </AuthProvider>
    )
}
export default AdminLayout