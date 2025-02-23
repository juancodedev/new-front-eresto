

import React, { useEffect, useCallback } from "react"
import { Loader } from "../../components/ui/loader"
import { HeaderPage } from "../../components/admin/header-page"
import { TablesListAdmin } from "../../components/admin/tables-list-admin"
import { useTable } from "../../hooks/use-table"

export function TablesAdminClient() {
    const { loading, tables, getTables, updateTableStatus } = useTable()

    const handleReload = useCallback(() => {
        getTables()
    }, [getTables])

    useEffect(() => {
        getTables()
    }, [getTables])

    return (
        <>
            <HeaderPage title="Estado de Mesas del Restaurante" />
            {loading ? (
                <Loader>Cargando...</Loader>
            ) : (
                <TablesListAdmin tables={tables} onReload={handleReload} updateTableStatus={updateTableStatus} />
            )}
        </>
    )
}

