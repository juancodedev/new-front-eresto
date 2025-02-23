

import React, { useState, useEffect, useCallback } from "react"

import { useFormik } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useCategory } from "../../hooks/use-category"
import { useProduct } from "../../hooks/use-product"
import styles from "./add-edit-product-form.module.css"

interface Category {
  id: string
  title: string
}

// interface Product {
//     id: string
//     title: string
//     price: number
//     category: string
//     category_data: string
//     active: boolean
//     image: string
// }

interface Product {
    id: string
    title: string
    price: number
    category: string
    category_data: {
        title: string
    }
    active: boolean
    image: string
}

interface AddEditProductFormProps {
  onClose: () => void
  onRefetch: () => void
  product?: Product
}

export function AddEditProductForm({ onClose, onRefetch, product }: AddEditProductFormProps) {
  const [categoriesFormat, setCategoriesFormat] = useState<{ value: string; label: string }[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(product ? product.image : null)
  const { categories, getCategories } = useCategory()
  const { addProduct, updateProduct } = useProduct()

  useEffect(() => {
    getCategories()
  }, [getCategories])

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories))
  }, [categories])

  const formik = useFormik({
    initialValues: initialValues(product),
        validationSchema: product ? updateSchema() : newSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
            const categoryData = categories.find(category => category.id === formValue.category)
            const productData = {
                ...formValue,
                price: Number(formValue.price),
                category_data: categoryData ? { title: categoryData.title } : { title: '' }
                
            };
            if (product) await updateProduct(
                product.id, 
                productData)
            else await addProduct(productData)

            onRefetch()
            onClose()
        },
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            formik.setFieldValue("image", file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    return (
        <form className={styles.addEditProductForm} onSubmit={formik.handleSubmit}>
            <Input
                name="title"
                placeholder="Nombre del producto"
                value={formik.values.title}
                onChange={formik.handleChange}
                // onError={formik.errors.title}
            />
            <Input
                type="number"
                name="price"
                placeholder="Precio"
                value={formik.values.price}
                onChange={formik.handleChange}
                // onError={formik.errors.price}
            />

            <Select
                name="category"
                value={formik.values.category}
                onValueChange={(value) => formik.setFieldValue("category", value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                    {categoriesFormat.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className={styles.activeCheckbox}>
                <Checkbox
                    id="active"
                    checked={formik.values.active}
                    onCheckedChange={(checked) => formik.setFieldValue("active", checked)}
                />
                <Label htmlFor="active">Producto activo</Label>
            </div>
            <div className={styles.fileInputContainer}>
                <Label htmlFor="image">Subir imagen</Label>
                <Input
                    type="file"
                    id="image"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                />
            </div>
            {previewImage && (
                <img src={previewImage} alt="Preview" width={200} height={200} className={styles.previewImage} />
            )}

            <Button type="submit">
                {product ? "Actualizar" : "Crear"}
            </Button>
        </form>
    )
}

function formatDropdownData(data: Category[]) {
    return data.map((item) => ({
        value: item.id,
        label: item.title,
    }))
}

function initialValues(data?: Product) {
    return {
        title: data?.title || "",
        price: data?.price || "",
        category: data?.category || "",
        active: data?.active || false,
        image: "",
    }
}

const newSchema = () => {
    return Yup.object({
        title: Yup.string().required("El título es requerido"),
        price: Yup.number().required("El precio es requerido"),
        category: Yup.string().required("La categoría es requerida"),
        active: Yup.boolean().required("El estado es requerido"),
        image: Yup.mixed().required("La imagen es requerida"),
    })
}

const updateSchema = () =>  {
    return Yup.object({
        title: Yup.string().required("El título es requerido"),
        price: Yup.number().required("El precio es requerido"),
        category: Yup.string().required("La categoría es requerida"),
        active: Yup.boolean().required("El estado es requerido"),
        image: Yup.mixed().required('La imagen es obligatoria'),
    })
}

