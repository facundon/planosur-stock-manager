import { AxiosError } from "axios"
import {
   useMutation,
   UseMutationResult,
   useQuery,
   useQueryClient,
   UseQueryResult,
} from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import { addUpdater, deleteUpdater, patchUpdater } from "../../shared/utils/queriesUpdater"
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
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.patch<Provider>(`/providers/${id}`, form)
         return response.data
      },
      {
         onSuccess: data => {
            queryClient.setQueryData(PROVIDERS_KEYS.byId(id), data)
            queryClient.setQueryData<Provider[]>(PROVIDERS_KEYS.base, prev =>
               patchUpdater(data, prev, "id")
            )
         },
      }
   )
}

export function useDeleteProviderQuery(): UseMutationResult<Provider, AxiosError, number> {
   const queryClient = useQueryClient()

   return useMutation(
      async id => {
         const response = await apiClient.delete<Provider>(`/providers/${id}`)
         return response.data
      },
      {
         onSuccess: (_, id) => {
            queryClient.setQueryData(PROVIDERS_KEYS.byId(id), () => undefined)
            queryClient.setQueryData<Provider[] | undefined>(PROVIDERS_KEYS.base, prev =>
               deleteUpdater(id, prev, "id")
            )
         },
      }
   )
}

export function useAddProviderQuery(): UseMutationResult<Provider, AxiosError, ProviderFormDto> {
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.post<Provider>("/providers", form)
         return response.data
      },
      {
         onSuccess: data => {
            queryClient.setQueryData<Provider[]>(PROVIDERS_KEYS.base, prev =>
               addUpdater(data, prev)
            )
         },
      }
   )
}
