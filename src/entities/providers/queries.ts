import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import { AddProviderForm, Provider, UpdateProviderForm } from "./domain"
import { PROVIDERS_KEYS } from "./queryKeys"

export function useProviderQuery(id: number): UseQueryResult<Provider> {
   return useQuery(PROVIDERS_KEYS.byId(id), async () => {
      const response = await apiClient.get<Provider>(`/providers/${id}`)
      return response.data
   })
}

export function useCategoriesQuery(): UseQueryResult<Provider[]> {
   return useQuery(PROVIDERS_KEYS.base, async () => {
      const response = await apiClient.get<Provider[]>("/providers")
      return response.data
   })
}

export function useUpdateProviderQuery(
   id: number,
   form: UpdateProviderForm
): UseMutationResult<Provider> {
   return useMutation(async () => {
      const response = await apiClient.patch<Provider>(`/providers/${id}`, form)
      return response.data
   })
}

export function useDeleteProviderQuery(id: number): UseMutationResult<Provider> {
   return useMutation(async () => {
      const response = await apiClient.delete<Provider>(`/providers/${id}`)
      return response.data
   })
}

export function useAddProviderQuery(form: AddProviderForm): UseMutationResult<Provider> {
   return useMutation(async () => {
      const response = await apiClient.post<Provider>("/providers", form)
      return response.data
   })
}
