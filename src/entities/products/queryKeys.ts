export const PRODUCTS_KEYS = {
   base: ["products"],
   byCode: (code: string | undefined): string[] => [...PRODUCTS_KEYS.base, code || ""],
   filtered: (filters: string[]): string[] => [...PRODUCTS_KEYS.base, ...filters],
}
