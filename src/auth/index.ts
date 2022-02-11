import { navigate } from "hookrouter"
import { useEffect, useState } from "react"
import { apiClient, JWT_KEY } from "../shared/utils/apiClient"
import { useLoginQuery } from "./query"

export function useAuth() {
   const loginQuery = useLoginQuery()
   const [isAuth, setIsAuth] = useState<boolean>()

   useEffect(() => {
      const checkAuth = async () => {
         const response = await apiClient.get<boolean>("/auth/isAuth")
         if (response.data) return setIsAuth(true)
         setIsAuth(false)
      }

      const token = localStorage.getItem(JWT_KEY)
      if (token) return setIsAuth(true)
      checkAuth()
   }, [])

   useEffect(() => {
      if (loginQuery.data?.access_token) {
         localStorage.setItem(JWT_KEY, loginQuery.data.access_token)
         navigate("/")
      }
   }, [loginQuery.data?.access_token])

   const login = (password: string) =>
      loginQuery.mutate({ password }, { onSuccess: () => setIsAuth(true) })

   return { login, isAuth }
}
