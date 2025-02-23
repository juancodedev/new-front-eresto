import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Label } from "~/components/ui/label"
import { useUser } from "../../hooks/use-user"

interface AddEditUserFormProps {
  user?: any
  onClose: () => void
  onRefetch: () => void
}

export function AddEditUserForm({ user, onClose, onRefetch }: AddEditUserFormProps) {
  const { addUser, updateUser } = useUser()

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      is_active: user?.is_active || false,
      is_staff: user?.is_staff || false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("El nombre de usuario es requerido"),
      email: Yup.string().email("Email inválido").required("El email es requerido"),
      first_name: Yup.string().required("El nombre es requerido"),
      last_name: Yup.string().required("El apellido es requerido"),
    }),
    onSubmit: async (formValue) => {
      try {
        if (user) {
          await updateUser(user.id, formValue)
        } else {
          await addUser(formValue)
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
        name="username"
        placeholder="Nombre de usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Input
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Input
        name="first_name"
        placeholder="Nombre"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.errors.first_name}
      />
      <Input
        name="last_name"
        placeholder="Apellido"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.errors.last_name}
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_active"
          checked={formik.values.is_active}
          onCheckedChange={(checked) => formik.setFieldValue("is_active", checked)}
        />
        <Label htmlFor="is_active">Usuario activo</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_staff"
          checked={formik.values.is_staff}
          onCheckedChange={(checked) => formik.setFieldValue("is_staff", checked)}
        />
        <Label htmlFor="is_staff">Usuario staff</Label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {user ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  )
}

