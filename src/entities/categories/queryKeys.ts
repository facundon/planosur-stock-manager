export const CATEGORIES_KEYS = {
   base: ["categories"],
   byId: (id: number | undefined): string[] => [...CATEGORIES_KEYS.base, id?.toString() || ""],
}
