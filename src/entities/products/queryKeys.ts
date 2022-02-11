export const PRODUCTS_KEYS = {
   base: ["products"],
   byCode: (code: string): string[] => [...PRODUCTS_KEYS.base, code],
   filtered: (filters: string[]): string[] => [...PRODUCTS_KEYS.base, ...filters],
}
