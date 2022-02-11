export type Provider = {
   id: number
   name: string
   phone: number | null
   address: string | null
   email: string | null
}

export type AddProviderFormDto = Omit<Provider, "id">

export type UpdateProviderFormDto = Partial<AddProviderFormDto>
