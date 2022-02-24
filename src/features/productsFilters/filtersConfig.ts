import { ProductWithProviderAndCategory } from "../../entities/products/domain"
import { SelectOption } from "../../shared/components/form"

export type FilterOptionsKind = "text" | "select" | "checkbox" | "date"
export type FilterOptions = (SelectOption & { kind: FilterOptionsKind })[]

export type Filter = {
   options: FilterOptions
   value: string | number | boolean | Date
   label: string
   accessor: keyof ProductWithProviderAndCategory
}

const dateOptions: FilterOptions = [
   { label: "Antes de", value: "lte", kind: "date" },
   { label: "Despues de", value: "gte", kind: "date" },
   { label: "El día", value: "eq", kind: "date" },
]

const numericOptions: FilterOptions = [
   { label: "Mayor o igual", value: "gte", kind: "text" },
   { label: "Menor o igual", value: "lte", kind: "text" },
   { label: "Igual", value: "eq", kind: "text" },
]

const selectOptions: FilterOptions = [
   { label: "Es", value: "eq", kind: "select" },
   { label: "No es", value: "not-eq", kind: "select" },
]

const checkboxOptions: FilterOptions = [{ label: "Es", value: "eq", kind: "checkbox" }]

export const filtersConfig: Filter[] = [
   { label: "Código", accessor: "code", value: "", options: [] },
   { label: "Nombre", accessor: "name", value: "", options: [] },
   { label: "Cantidad", accessor: "qty", value: "", options: [] },
   { label: "Unidad", accessor: "unit", value: "", options: [] },
   {
      label: "Precio [u$S]",
      accessor: "price",
      value: "",
      options: numericOptions,
   },
   {
      label: "Proveedor",
      accessor: "provider",
      value: "",
      options: selectOptions,
   },
   {
      label: "Categoría",
      accessor: "category",
      value: "",
      options: selectOptions,
   },
   {
      label: "Fue pedido",
      accessor: "didOrder",
      value: "",
      options: checkboxOptions,
   },
   {
      label: "Último pedido",
      accessor: "orderedAt",
      value: "",
      options: dateOptions,
   },
   {
      label: "Stock Capital",
      accessor: "blankStock",
      value: "",
      options: numericOptions,
   },
   {
      label: "Stock Provincia",
      accessor: "unregisteredStock",
      value: "",
      options: numericOptions,
   },
   {
      label: "Stock Mín. Capital",
      accessor: "blankMinStock",
      value: "",
      options: numericOptions,
   },
   {
      label: "Stock Mín. Provincia",
      accessor: "unregisteredMinStock",
      value: "",
      options: numericOptions,
   },
   {
      label: "Stock Max. Capital",
      accessor: "blankMaxStock",
      value: "",
      options: numericOptions,
   },
   {
      label: "Stock Max. Provincia",
      accessor: "unregisteredMaxStock",
      value: "",
      options: numericOptions,
   },
   {
      label: "Actualizado",
      accessor: "updatedAt",
      value: "",
      options: dateOptions,
   },
]
