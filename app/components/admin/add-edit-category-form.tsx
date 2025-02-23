import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"

interface AddEditCategoryFormProps {
  onClose: () => void
  onRefetch: () => void
  category?: { id: string; title: string }
}

export function AddEditCategoryForm({ onClose, onRefetch, category }: AddEditCategoryFormProps) {
  const [title, setTitle] = useState(category?.title || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to save or update the category
    console.log("Saving category:", { id: category?.id, title })
    onRefetch()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título de la categoría</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {category ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  )
}

