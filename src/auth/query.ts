import { useToast } from "@chakra-ui/react"
import { useMutation, UseMutationResult } from "react-query"
import { apiClient } from "../shared/utils/apiClient"

type AuthData = {
   password: string
}
type LoginResponse = {
   access_token: string
}

export function useLoginQuery(): UseMutationResult<LoginResponse, Error, AuthData> {
   const toast = useToast({ variant: "top-accent", position: "bottom-left" })

   return useMutation(
      async ({ password }): Promise<LoginResponse> => {
         const response = await apiClient.post<LoginResponse>("/auth/login", {
            username: "any",
            password,
         })
         return response.data
      },
      {
         onError() {
            if (!toast.isActive("pw")) {
               toast({ status: "error", title: "Clave incorrecta", id: "pw" })
            }
         },
      }
   )
}
