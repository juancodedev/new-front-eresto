import { useState, useCallback } from "react"

interface Table {
  id: string
  number: number
  status: 'free' | 'occupied' | 'reserved' | 'pending_payment' | 'paid' | 'closed'
}

export function useTable() {
  const [loading, setLoading] = useState(false)
  const [tables, setTables] = useState<Table[]>([])

  const getTables = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/tables/')
      if (!response.ok) {
        throw new Error('Error al obtener mesas')
      }
      const data = await response.json()
      setTables(data)
    } catch (error) {
      console.error("Error:", error)
    }finally{
      setLoading(false)
    }


    // Here you would typically fetch tables from an API
    // For now, we'll use mock data
    // const mockTables: Table[] = [
    //   { id: "1", number: 1, status: 'free' },
    //   { id: "2", number: 2, status: 'occupied' },
    //   { id: "3", number: 3, status: 'reserved' },
    //   { id: "4", number: 4, status: 'pending_payment' },
    //   { id: "5", number: 5, status: 'paid' },
    // ]
    // setTables(mockTables)
    // setLoading(false)
  }, [])

  const updateTableStatus = useCallback(async (id: string, status: Table['status']) => {
    // Here you would typically call an API to update the table status
    console.log("Updating table status:", id, status)
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === id ? { ...table, status } : table
      )
    )
  }, [])

  return { loading, tables, getTables, updateTableStatus }
}

