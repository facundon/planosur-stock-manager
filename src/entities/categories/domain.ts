export type Category = {
   id: number
   name: string
}

export type AddCategoryFormDto = Omit<Category, "id">

export type UpdateCategoryFormDto = Partial<AddCategoryFormDto>
