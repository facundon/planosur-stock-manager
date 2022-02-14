export type Provider = {
   id: number
   name: string
   phone: number | null
   address: string | null
   email: string | null
}

export type ProviderFormDto = Omit<Provider, "id">
