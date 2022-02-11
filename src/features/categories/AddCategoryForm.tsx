import { useAddCategoryQuery } from "../../entities/categories/queries"

type AddCategoryFormProps = unknown

export const AddCategoryForm: React.FC<AddCategoryFormProps> = () => {
   const createCategoryQuery = useAddCategoryQuery()

   return (
      <div>
         <button onClick={() => createCategoryQuery.mutate({ name: "test" })}>Add</button>
      </div>
   )
}
