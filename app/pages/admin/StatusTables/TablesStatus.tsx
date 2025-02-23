import React, { useEffect, useCallback } from "react"
import { Loader } from '~/components/ui/loader'
import { HeaderPage } from "~/components/admin/header-page"
import { TablesListAdmin } from "~/components/admin/tables-list-admin"
import { useTable } from "~/hooks/use-table"

export function TablesStatusClient() {
  const { loading, tables, getTables } = useTable()

  const handleReload = useCallback(() => {
    getTables()
  }, [getTables])

  useEffect(() => {
    getTables()
  }, [getTables])

  const updateTableStatus = async (id: string, status: "free" | "occupied" | "reserved" | "pending_payment" | "paid" | "closed") => {
    try {
      const response = await fetch(`/api/tables/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
  
      if (!response.ok) {
        throw new Error("Error updating table status")
      }
  
      getTables() // Recargar las mesas después de la actualización
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <>
      <HeaderPage title="Estado de Mesas del Restaurante" btnTitle={""} btnClick={function (): void {
        throw new Error("Function not implemented.")
      }} />
      {loading ? (
        <Loader>Cargando...</Loader>
      ) : (
        <TablesListAdmin 
          tables={tables}
          onReload={handleReload}
          updateTableStatus={updateTableStatus}
        />
      )}
    </>
  )
}

