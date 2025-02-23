import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, QrCode } from 'lucide-react'

interface TableItem {
  id: string
  number: number
}

interface TableListProps {
  tables: TableItem[]
  updateTable: (table: TableItem) => void
  deleteTable: (id: string) => void
  showQR: (table: TableItem) => void
}

export function TableList({ tables, updateTable, deleteTable, showQR }: TableListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Mesa</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tables.map((table) => (
          <TableRow key={table.id}>
            <TableCell>Mesa {table.number}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" onClick={() => updateTable(table)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteTable(table.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => showQR(table)}>
                <QrCode className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

