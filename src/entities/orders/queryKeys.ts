import { OrderFilters } from "./domain"

export const ORDER_KEYS = {
   base: ["orders"],
   byId: (id: number | undefined): string[] => [...ORDER_KEYS.base, id?.toString() || ""],
   filtered: (filters: OrderFilters): unknown[] => [...ORDER_KEYS.base, "filtered", filters],
}
