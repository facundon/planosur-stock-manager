import { Product } from "../products/domain"
import { Provider } from "../providers/domain"

export type Order = {
   id: number
   provider: { name: Provider["name"] }
   providerId: number
   createdAt: Date
   file: string
}

export type ProductInOrder = {
   id: number
   productId: string
   orderId: number
   blankQty: number
   unregisteredQty: number
}

export type OrderWithProducts = Order & {
   productInOrder: (ProductInOrder & {
      product: Product
   })[]
}

export type CreateOrderDto = {
   providerId: number | undefined
   products: {
      code: string
      blankQty: number
      unregisteredQty: number
   }[]
}

export type UpdateOrderDto = Pick<CreateOrderDto, "products">

export type OrderFilters = {
   searchVal?: string
}
