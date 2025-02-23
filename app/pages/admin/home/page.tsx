import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Button } from '~/components/ui/button';

const AdminIndex: React.FC = () => {
    const navigate = useNavigate()
    const [selectedTable, setSelectedTable] = useState<string | undefined>()

    // En una aplicación real, estas mesas vendrían de una base de datos
    const tables = Array.from({ length: 20 }, (_, i) => (i + 1).toString())

    const handleTableSelect = (table: string) => {
        setSelectedTable(table)
    }

    const handleGoToTable = () => {
        if (selectedTable) {
            navigate(`/table/${selectedTable}`)
        }
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Seleccione una mesa</h1>
            <div className="w-full max-w-xs">
                <Select onValueChange={handleTableSelect}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                        {tables.map((table) => (
                            <SelectItem key={table} value={table}>
                                Mesa {table}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleGoToTable} className="w-full mt-4" disabled={!selectedTable}>
                    Ir a la mesa
                </Button>
            </div>
        </div>
    );
};

export default AdminIndex;