import { useToast } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect, useState } from "react"
import { apiClient, JWT_KEY } from "../shared/utils/apiClient"
import { useLoginQuery } from "./query"

export function useAuth() {
   const { mutate: requestLogin, data, isError, isLoading } = useLoginQuery()
   const [isAuth, setIsAuth] = useState<boolean>()
   const toast = useToast({ position: "bottom", variant: "top-accent" })

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await apiClient.get<boolean>("/auth/isAuth")
            toast.close("conn")
            if (response?.data) return setIsAuth(true)
            setIsAuth(false)
         } catch (error) {
            if (!toast.isActive("conn")) {
               toast({
                  title: error as string,
                  isClosable: false,
                  id: "conn",
                  status: "error",
                  duration: 1000 * 60 * 60,
               })
            }
         }
      }

      const token = localStorage.getItem(JWT_KEY)
      if (token) return setIsAuth(true)
      checkAuth()
   }, [])

   useEffect(() => {
      if (data?.access_token) {
         localStorage.setItem(JWT_KEY, data.access_token)
         navigate("/")
      }
   }, [data?.access_token])

   const login = (password: string) =>
      requestLogin({ password }, { onSuccess: () => setIsAuth(true) })

   return { login, isAuth, isError, isLoading }
}
