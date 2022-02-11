import { useLoginQuery } from "./query"

export const LoginPage: React.FC = () => {
   const loginQuery = useLoginQuery()
   return (
      <div>
         <h1>Login</h1>
         <button onClick={() => loginQuery.mutate({ password: "admin1234" })}>send</button>
      </div>
   )
}
