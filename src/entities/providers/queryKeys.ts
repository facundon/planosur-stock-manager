export const PROVIDERS_KEYS = {
   base: ["providers"],
   byId: (id: number): string[] => [...PROVIDERS_KEYS.base, id.toString()],
}
