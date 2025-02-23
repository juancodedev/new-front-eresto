import React from "react"
import { Button } from "~/components/ui/button"

interface Table {
  id: string
  number: number
  status: 'free' | 'occupied' | 'reserved' | 'pending_payment' | 'paid' | 'closed'
}

interface TableStatusModalProps {
  table: Table
  onUpdateStatus: (status: Table['status']) => void
}

export function TableStatusModal({ table, onUpdateStatus }: TableStatusModalProps) {
  const statuses: Table['status'][] = ['free', 'occupied', 'reserved', 'pending_payment', 'paid', 'closed']

  const getStatusText = (status: Table['status']) => {
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
    <div className="space-y-4">
      <p className="text-lg font-medium">Seleccione el nuevo estado para la Mesa {table.number}:</p>
      <div className="grid grid-cols-2 gap-2">
        {statuses.map((status) => (
          <Button
            key={status}
            onClick={() => onUpdateStatus(status)}
            variant={table.status === status ? "default" : "outline"}
          >
            {getStatusText(status)}
          </Button>
        ))}
      </div>
    </div>
  )
}

