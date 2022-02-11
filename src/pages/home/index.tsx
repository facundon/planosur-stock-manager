import { useAuth } from "../../auth"
import { AddCategoryForm } from "../../features/categories/AddCategoryForm"

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()

   return (
      <div>
         {isAuth ? "Logged" : "Not Logged"}
         <AddCategoryForm />
      </div>
   )
}

export default HomePage
