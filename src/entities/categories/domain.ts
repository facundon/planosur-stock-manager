export type Category = {
   id: number
   name: string
}

export type AddCategoryForm = Omit<Category, "id">

export type UpdateCategoryForm = Partial<AddCategoryForm>
