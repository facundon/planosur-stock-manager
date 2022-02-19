export const PROVIDERS_KEYS = {
   base: ["providers"],
   byId: (id: number | undefined): string[] => [...PROVIDERS_KEYS.base, id?.toString() || ""],
}
