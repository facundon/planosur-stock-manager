import { AxiosError } from "axios"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import { ProviderFormDto, Provider } from "./domain"
import { PROVIDERS_KEYS } from "./queryKeys"

export function useProviderQuery(id: number): UseQueryResult<Provider, AxiosError> {
   return useQuery(PROVIDERS_KEYS.byId(id), async () => {
      const response = await apiClient.get<Provider>(`/providers/${id}`)
      return response.data
   })
}

export function useProvidersQuery(enabled = true): UseQueryResult<Provider[], AxiosError> {
   return useQuery(
      PROVIDERS_KEYS.base,
      async () => {
         const response = await apiClient.get<Provider[]>("/providers")
         return response.data
      },
      { enabled }
   )
}

export function useUpdateProviderQuery(
   id: number
): UseMutationResult<Provider, AxiosError, ProviderFormDto> {
   return useMutation(async form => {
      const response = await apiClient.patch<Provider>(`/providers/${id}`, form)
      return response.data
   })
}

export function useDeleteProviderQuery(): UseMutationResult<Provider, AxiosError, number> {
   return useMutation(async id => {
      const response = await apiClient.delete<Provider>(`/providers/${id}`)
      return response.data
   })
}

export function useAddProviderQuery(): UseMutationResult<Provider, AxiosError, ProviderFormDto> {
   return useMutation(async form => {
      const response = await apiClient.post<Provider>("/providers", form)
      return response.data
   })
}
