import { useMutation, UseMutationResult } from "react-query"
import { apiClient, JWT_KEY } from "../../shared/utils/apiClient"

type AuthData = {
   password: string
}
type LoginResponse = {
   access_token: string
}

export function useLoginQuery(): UseMutationResult<LoginResponse, Error, AuthData> {
   return useMutation(async ({ password }): Promise<LoginResponse> => {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
         username: "any",
         password,
      })
      localStorage.setItem(JWT_KEY, response.data.access_token)
      return response.data
   })
}
