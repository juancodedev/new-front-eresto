import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { Check, X, Pencil, Trash2 } from 'lucide-react'
import styles from "./table-users.module.css"

interface User {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
    is_active: boolean
    is_staff: boolean
}

interface TableUsersProps {
    users: User[]
    updateUser: (user: User) => void
    onDeleteUser: (user: User) => void
}

export function TableUsers({ users, updateUser, onDeleteUser }: TableUsersProps) {
    return (
        <Table className={styles.tableUsersAdmin}>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellidos</TableHead>
                    <TableHead>Activo</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell className={styles.status}>
                            {user.is_active ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                        </TableCell>
                        <TableCell className={styles.status}>
                            {user.is_staff ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => updateUser(user)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onDeleteUser(user)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

