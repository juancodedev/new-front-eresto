import React, { useState, useEffect } from "react"
import { Button } from '~/components/ui/button'
import { Switch } from '~/components/ui/switch'
import { RefreshCw } from 'lucide-react'
import { TableAdmin } from "./table-admin"
import { TableStatusModal } from "./table-status-modal"
import { ModalBasic } from "~/components/common/modal-basic"
import styles from "./tables-list-admin.module.css"

interface Table {
  id: string
  number: number
  status: 'free' | 'occupied' | 'reserved' | 'pending_payment' | 'paid' | 'closed'
}

interface TablesListAdminProps {
  readonly tables: Table[]
  readonly onReload: () => void
  readonly updateTableStatus: (id: string, status: Table['status']) => void
}

export function TablesListAdmin({ tables, onReload, updateTableStatus }: Readonly<TablesListAdminProps>) {
  const [reload, setReload] = useState(false)
  const [autoReload, setAutoReload] = useState(false)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleReload = () => {
    setReload((prev) => !prev)
    onReload()
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (autoReload) {
      const autoReloadAction = () => {
        handleReload()
        timer = setTimeout(autoReloadAction, 5000)
      }
      autoReloadAction()
    }
    return () => clearTimeout(timer)
  }, [autoReload])

  const handleAutoReloadToggle = (checked: boolean) => {
    if (checked) {
      setAutoReload(true)
    } else {
      setAutoReload(false)
      window.location.reload()
    }
  }
  const handleTableClick = (table: Table) => {
    setSelectedTable(table)
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedTable(null)
  }
  const handleUpdateStatus = (status: Table['status']) => {
    if (selectedTable) {
      updateTableStatus(selectedTable.id, status)
      handleCloseModal()
    }
  }

  return (
    <div className={styles.tablesListAdmin}>
      <div className={styles.controls}>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReload}
          className={styles.reloadButton}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <div className={styles.autoReloadToggle}>
          <span>Recarga automática</span>
          <Switch
            checked={autoReload}
            onCheckedChange={handleAutoReloadToggle}
          />
        </div>
      </div>

      <div className={styles.tableGrid}>
        {tables.map((table) => (
          <TableAdmin
            key={table.id}
            table={table}
            reload={reload}
            onClick={() => handleTableClick(table)}
          />
        ))}
      </div>
      <ModalBasic
        show={showModal}
        onClose={handleCloseModal}
        title={selectedTable ? `Mesa ${selectedTable.number}` : ''}
      >
        {selectedTable && (
          <TableStatusModal
            table={selectedTable}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </ModalBasic>
    </div>
  )
}

