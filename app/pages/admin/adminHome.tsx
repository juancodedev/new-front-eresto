// import React from 'react';
// import { Outlet, Link } from 'react-router-dom';

// const AdminHome: React.FC = () => {
//     return (
//         <div>
//             <h1>Panel de Administración</h1>
//             <nav>
//                 <ul>
//                     <li><Link to="/admin">Inicio</Link></li>
//                     <li><Link to="/admin/users">Gestión de Usuarios</Link></li>
//                     <li><Link to="/admin/tables">Gestión de Mesas</Link></li>
//                     {/* Agrega más enlaces según sea necesario */}
//                 </ul>
//             </nav>
//             <Outlet /> {/* Renderiza las subrutas aquí */}
//         </div>
//     );
// };

// export default AdminHome;



import type { Route } from './+types/adminHome';
import AdminLayout from './AdminLayout'

export function meta(_: Route.MetaArgs) {
    return [
        { title: "App eRestó" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_VERCEL };
}

export default function AdminHome({ loaderData }: Readonly<Route.ComponentProps>) {
    return <AdminLayout />;
}