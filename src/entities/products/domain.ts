import { Category } from "../categories/domain"
import { Provider } from "../providers/domain"

export type Unit = "g" | "kg" | "lt" | "ml"

export type StockLevel = "high" | "medium" | "low"

export type StockType = "blank" | "unregistered"

export type Product = {
   code: string
   name: string
   qty: number
   unit: Unit
   providerId: number | null
   categoryId: number | null
   price: number
   blankStock: number
   blankMinStock: number
   blankMaxStock: number
   unregisteredStock: number
   unregisteredMinStock: number
   unregisteredMaxStock: number
   didOrder: boolean
   orderedAt: Date | null
   updatedAt: Date
   createdAt: Date
}

export type ProductFilters = {
   providerId?: number
   categoryId?: number
   priceMax?: string
   priceMin?: string
   searchVal?: string
   unregisteredStockMax?: number
   unregisteredStockMin?: number
   blankStockMax?: number
   blankStockMin?: number
   limit?: number
   simple?: boolean
   didOrder?: boolean
   updatedAtFrom?: string
   updatedAtTo?: string
   orderedAtFrom?: string
   orderedAtTo?: string
}

export type ProductWithProviderAndCategory = Product & {
   provider: {
      name: Provider["name"]
   }
   category: {
      name: Category["name"]
   }
}

export type ProductSimple = Pick<Product, "name" | "code">

export type ProductFormDto = Omit<Product, "updatedAt" | "createdAt">
