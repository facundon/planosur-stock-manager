import { StockType } from "../../entities/products/domain"

export type SaleProduct = {
   code: string
   amount: number
   type: StockType
}

export type SaleDto = {
   products: SaleProduct[]
}
