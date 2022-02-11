export const CATEGORIES_KEYS = {
   base: ["categories"],
   byId: (id: number): string[] => [...CATEGORIES_KEYS.base, id.toString()],
}
