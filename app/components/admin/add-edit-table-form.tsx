import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTable } from "../../hooks/use-table"

interface AddEditTableFormProps {
  onClose: () => void
  onRefetch: () => void
  table?: { id: string; number: number }
}

export function AddEditTableForm({ onClose, onRefetch, table }: AddEditTableFormProps) {
  const { addTable, updateTable } = useTable()

  const formik = useFormik({
    initialValues: {
      number: table?.number || "",
    },
    validationSchema: Yup.object({
      number: Yup.number().required("El número de mesa es requerido"),
    }),
    onSubmit: async (formValue) => {
      try {
        if (table) {
          await updateTable(table.id, formValue)
        } else {
          await addTable(formValue)
        }
        onRefetch()
        onClose()
      } catch (error) {
        console.error(error)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name="number"
        placeholder="Número de mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {table ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  )
}

