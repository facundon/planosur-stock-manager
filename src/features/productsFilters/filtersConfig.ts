import { ProductFilters } from "../../entities/products/domain"

export type FilterCondition = "gte" | "lte" | "lt" | "gt" | "eq" | "not-eq"

export type FiltersDto = {
   filters: {
      accessor: string
      value: string | number | boolean | Date
      condition: FilterCondition
   }[]
}

export type FilterInputKind = "text" | "select" | "checkbox" | "date"

export type Filter = {
   options: FilterSelectOption[]
   label: string
   accessor: string
   inputKind: FilterInputKind
}

export type FilterSelectOption = {
   label: string
   value: FilterCondition
}

const dateOptions: FilterSelectOption[] = [
   { label: "Antes de", value: "lte" },
   { label: "Despues de", value: "gte" },
   { label: "El día", value: "eq" },
]

const numericOptions: FilterSelectOption[] = [
   { label: "Mayor o igual", value: "gte" },
   { label: "Menor o igual", value: "lte" },
   { label: "Igual", value: "eq" },
]

const selectOptions: FilterSelectOption[] = [
   { label: "Es", value: "eq" },
   { label: "No es", value: "not-eq" },
]

const checkboxOptions: FilterSelectOption[] = [{ label: "Es", value: "eq" }]

export const filtersConfig: Filter[] = [
   {
      label: "Precio [u$S]",
      accessor: "price",
      options: numericOptions,
      inputKind: "text",
   },
   {
      label: "Proveedor",
      accessor: "provider",
      options: selectOptions,
      inputKind: "select",
   },
   {
      label: "Categoría",
      accessor: "category",
      options: selectOptions,
      inputKind: "select",
   },
   {
      label: "Fue pedido",
      accessor: "didOrder",
      options: checkboxOptions,
      inputKind: "checkbox",
   },
   {
      label: "Último pedido",
      accessor: "orderedAt",
      options: dateOptions,
      inputKind: "date",
   },
   {
      label: "Stock Capital",
      accessor: "blankStock",
      options: numericOptions,
      inputKind: "text",
   },
   {
      label: "Stock Provincia",
      accessor: "unregisteredStock",
      options: numericOptions,
      inputKind: "text",
   },
   {
      label: "Actualizado",
      accessor: "updatedAt",
      options: dateOptions,
      inputKind: "date",
   },
]
