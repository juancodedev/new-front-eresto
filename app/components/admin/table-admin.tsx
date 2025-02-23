import React from "react"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import styles from "./table-admin.module.css"

interface Table {
    id: string
    number: number
  status: 'free' | 'occupied' | 'reserved' | 'pending_payment' | 'paid' | 'closed'
}

interface TableAdminProps {
    table: Table
    reload: boolean
  onClick: () => void
}

export function TableAdmin({ table, reload, onClick }: TableAdminProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'free':
                return 'bg-green-500'
            case 'occupied':
                return 'bg-red-500'
            case 'reserved':
                return 'bg-yellow-500'
      case 'pending_payment':
        return 'bg-blue-500'
      case 'paid':
        return 'bg-purple-500'
      case 'closed':
        return 'bg-gray-500'
            default:
                return 'bg-gray-500'
        }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'free':
        return 'Libre'
      case 'occupied':
        return 'Ocupada'
      case 'reserved':
        return 'Reservada'
      case 'pending_payment':
        return 'Cuenta pedida'
      case 'paid':
        return 'Pagado'
      case 'closed':
        return 'Cerrada'
      default:
        return status
    }
  }

    return (
    <Card className={`${styles.tableCard} cursor-pointer`} onClick={onClick}>
            <CardContent className={styles.tableContent}>
                <div className={styles.tableNumber}>Mesa {table.number}</div>
                <Badge className={`${styles.tableStatus} ${getStatusColor(table.status)}`}>
          {getStatusText(table.status)}
                </Badge>
            </CardContent>
        </Card>
    )
}

