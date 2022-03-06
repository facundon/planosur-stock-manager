export const ORDER_KEYS = {
   base: ["orders"],
   byId: (id: number | undefined): string[] => [...ORDER_KEYS.base, id?.toString() || ""],
}
