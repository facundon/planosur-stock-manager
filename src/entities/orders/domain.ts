import { Product } from "../products/domain"
import { Provider } from "../providers/domain"

export type OrderStatus = "fullfiled" | "pending" | "claim" | "canceled"

export type Order = {
   id: number
   providerId: number
   createdAt: Date
   updatedAt: Date
   status: OrderStatus
   file: string
}

export type ProductInOrder = {
   id: number
   productId: string
   orderId: number
   qty: number
}

export type OrderWithProvider = Order & {
   provider: {
      name: Provider["name"]
   }
}

export type OrderWithProducts = Order & {
   productInOrder: (ProductInOrder & {
      product: Product
   })[]
}

export type CreateOrderDto = {
   providerId: number
   products: {
      code: string
      qty: number
   }[]
}

export type UpdateOrderDto = Partial<CreateOrderDto> & {
   status: OrderStatus
}
