import { RegisterOptions } from "react-hook-form"
import { ProductFilters, ProductWithProviderAndCategory } from "../../entities/products/domain"
import { formatInputDate } from "../../shared/utils/dates"

export type FilterCondition = "gte" | "lte" | "lt" | "gt" | "eq" | "not-eq"

export type FilterAccessor = keyof Pick<
   ProductWithProviderAndCategory,
   | "blankStock"
   | "category"
   | "didOrder"
   | "orderedAt"
   | "provider"
   | "unregisteredStock"
   | "updatedAt"
   | "price"
   | "name"
>

export type FiltersDto = {
   filters: Filter[]
}

export type FilterInputKind = "text" | "select" | "checkbox" | "date" | "number"

export type Filter = {
   options?: FilterSelectOption[]
   label: string
   accessor: FilterAccessor
   inputKind: FilterInputKind
   initialValue: number | string | boolean
   rules?: Partial<RegisterOptions>
   condition?: FilterCondition
   value?: string | number | boolean | Date
}

export type FilterSelectOption = {
   label: string
   value: FilterCondition
}

const dateOptions: FilterSelectOption[] = [
   { label: "Antes de", value: "lt" },
   { label: "Despues de", value: "gt" },
   { label: "El día", value: "eq" },
]

const numericOptions: FilterSelectOption[] = [
   { label: "Mayor o igual", value: "gte" },
   { label: "Menor o igual", value: "lte" },
   { label: "Igual", value: "eq" },
]

export const filtersConfig: Filter[] = [
   {
      label: "Nombre/Código",
      accessor: "name",
      inputKind: "text",
      initialValue: "",
   },
   {
      label: "Precio [u$S]",
      accessor: "price",
      options: numericOptions,
      inputKind: "number",
      initialValue: "",
   },
   {
      label: "Proveedor",
      accessor: "provider",
      inputKind: "select",
      initialValue: "",
   },
   {
      label: "Categoría",
      accessor: "category",
      inputKind: "select",
      initialValue: "",
   },
   {
      label: "Fue pedido",
      accessor: "didOrder",
      inputKind: "checkbox",
      initialValue: true,
      rules: { required: false },
   },
   {
      label: "Último pedido",
      accessor: "orderedAt",
      options: dateOptions,
      inputKind: "date",
      initialValue: formatInputDate(new Date()),
   },
   {
      label: "Stock Capital",
      accessor: "blankStock",
      options: numericOptions,
      inputKind: "number",
      initialValue: "",
   },
   {
      label: "Stock Provincia",
      accessor: "unregisteredStock",
      options: numericOptions,
      inputKind: "number",
      initialValue: "",
   },
   {
      label: "Actualizado",
      accessor: "updatedAt",
      options: dateOptions,
      inputKind: "date",
      initialValue: formatInputDate(new Date()),
   },
]

export function mapFilters(data: FiltersDto): ProductFilters {
   const productFilters: ProductFilters = {}
   data.filters.map(filter => {
      switch (filter.accessor) {
         case "name":
            productFilters.searchVal = filter.value as string
            break

         case "blankStock":
            if (filter.condition === "gte") productFilters.blankStockMin = Number(filter?.value)
            if (filter.condition === "lte") productFilters.blankStockMax = Number(filter?.value)
            if (filter.condition === "eq")
               productFilters.blankStockMax = productFilters.blankStockMin = Number(filter?.value)
            break

         case "unregisteredStock":
            if (filter.condition === "gte")
               productFilters.unregisteredStockMin = Number(filter?.value)
            if (filter.condition === "lte")
               productFilters.unregisteredStockMax = Number(filter?.value)
            if (filter.condition === "eq")
               productFilters.unregisteredStockMax = productFilters.unregisteredStockMin = Number(
                  filter?.value
               )
            break

         case "category":
            productFilters.categoryId = Number(filter?.value)
            break

         case "provider":
            productFilters.providerId = Number(filter?.value)
            break

         case "didOrder":
            productFilters.didOrder = Boolean(filter?.value)
            break

         case "price":
            if (filter.condition === "gte") productFilters.priceMin = filter.value as string
            if (filter.condition === "lte") productFilters.priceMax = filter.value as string
            if (filter.condition === "eq")
               productFilters.priceMax = productFilters.priceMin = filter.value as string
            break

         case "updatedAt":
            if (filter.condition === "gt") productFilters.updatedAtFrom = filter.value as string
            if (filter.condition === "lt") productFilters.updatedAtTo = filter.value as string
            if (filter.condition === "eq")
               productFilters.updatedAtTo = productFilters.updatedAtFrom = filter.value as string
            break

         case "orderedAt":
            if (filter.condition === "gt") productFilters.orderedAtFrom = filter.value as string
            if (filter.condition === "lt") productFilters.orderedAtTo = filter.value as string
            if (filter.condition === "eq")
               productFilters.orderedAtTo = productFilters.orderedAtFrom = filter.value as string
            break
      }
   })
   return productFilters
}
