import { Category } from "../categories/domain"
import { Provider } from "../providers/domain"

export type Unit = "g" | "kg" | "lt" | "ml"

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

export type ProductWithProviderAndCategory = Product & {
   provider: {
      name: Provider["name"]
   }
   category: {
      name: Category["name"]
   }
}

export type ProductFormDto = Omit<Product, "updatedAt" | "createdAt">
