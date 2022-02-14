export type Category = {
   id: number
   name: string
}

export type CategoryFormDto = Omit<Category, "id">
