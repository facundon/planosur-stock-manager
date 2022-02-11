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
   currentStock: number
   minStock: number
   maxStock: number
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

export type AddProductForm = Omit<Product, "updatedAt" | "createdAt">

export type UpdateProductForm = Partial<AddProductForm>
