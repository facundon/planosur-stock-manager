import { RegisterOptions } from "react-hook-form"
import { ProductFilters, ProductWithProviderAndCategory } from "../../entities/products/domain"

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
>

export type FiltersDto = {
   filters: {
      accessor: FilterAccessor
      value: string | number | boolean | Date
      condition: FilterCondition
   }[]
}

export type FilterInputKind = "text" | "select" | "checkbox" | "date"

export type Filter = {
   options: FilterSelectOption[]
   label: string
   accessor: FilterAccessor
   inputKind: FilterInputKind
   rules?: Partial<RegisterOptions>
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
      rules: { required: { value: true, message: "Ingresar un valor" } },
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

export function mapFilters(data: FiltersDto): ProductFilters {
   const productFilters: ProductFilters = {}
   data.filters.map(filter => {
      switch (filter.accessor) {
         case "blankStock":
            if (filter.condition === "gte") productFilters.blankStockMin = +filter.value
            if (filter.condition === "lte") productFilters.blankStockMax = +filter.value
            if (filter.condition === "eq")
               productFilters.blankStockMax = productFilters.blankStockMin = +filter.value
            break

         case "unregisteredStock":
            if (filter.condition === "gte") productFilters.unregisteredStockMin = +filter.value
            if (filter.condition === "lte") productFilters.unregisteredStockMax = +filter.value
            if (filter.condition === "eq")
               productFilters.unregisteredStockMax = productFilters.unregisteredStockMin =
                  +filter.value
            break

         case "category":
            if (filter.condition === "eq") productFilters.categoryId = +filter.value
            //TODO: add not-eq condition value
            break

         case "provider":
            if (filter.condition === "eq") productFilters.providerId = +filter.value
            //TODO: add not-eq condition value
            break

         case "didOrder":
            //TODO: add
            break

         case "price":
            if (filter.condition === "gte") productFilters.priceMin = filter.value.toString()
            if (filter.condition === "lte") productFilters.priceMax = filter.value.toString()
            if (filter.condition === "eq")
               productFilters.priceMax = productFilters.priceMin = filter.value.toString()
            break

         case "updatedAt":
            //TODO: add
            break

         case "orderedAt":
            //TODO: add
            break
      }
   })
   return productFilters
}
