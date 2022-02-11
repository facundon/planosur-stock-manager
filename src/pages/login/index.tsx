import { useAuth } from "../../auth"

const LoginPage: React.FC = () => {
   const { login, isAuth } = useAuth()

   return (
      <div>
         <h1>Is Logged in? {isAuth ? "yes" : "no"}</h1>
         <button onClick={() => login("admin1234")}>send</button>
      </div>
   )
}

export default LoginPage
