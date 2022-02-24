import { ProductFilters } from "./domain"

export const PRODUCTS_KEYS = {
   base: ["products"],
   byCode: (code: string | undefined): string[] => [...PRODUCTS_KEYS.base, code || ""],
   filtered: (filters: ProductFilters): unknown[] => [...PRODUCTS_KEYS.base, "filtered", filters],
}
