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
import {
   CreateOrderDto,
   Order,
   OrderWithProducts,
   OrderWithProvider,
   UpdateOrderDto,
} from "./domain"
import { ORDER_KEYS } from "./queryKeys"

export function useOrderQuery(id: number): UseQueryResult<OrderWithProducts, AxiosError> {
   return useQuery(ORDER_KEYS.byId(id), async () => {
      const response = await apiClient.get<OrderWithProducts>(`/orders/${id}`)
      return response.data
   })
}

export function useOrdersQuery(enabled = true): UseQueryResult<OrderWithProvider[], AxiosError> {
   return useQuery(
      ORDER_KEYS.base,
      async () => {
         const response = await apiClient.get<OrderWithProvider[]>("/orders")
         return response.data
      },
      { enabled }
   )
}

export function useUpdateOrderQuery(
   id: number
): UseMutationResult<Order, AxiosError, UpdateOrderDto> {
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.patch<Order>(`/orders/${id}`, form)
         return response.data
      },
      {
         /*          onSuccess: data => {
            queryClient.setQueryData(ORDER_KEYS.byId(id), data)
            queryClient.setQueryData<Order[]>(ORDER_KEYS.base, prev =>
               patchUpdater(data, prev, "id")
            )
         }, */
      }
   )
}

export function useAddCategoryQuery(): UseMutationResult<Order, AxiosError, CreateOrderDto> {
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.post<Order>("/orders", form)
         return response.data
      },
      {
         /*          onSuccess: data => {
            queryClient.setQueryData<Order[]>(ORDER_KEYS.base, prev =>
               addUpdater(data, prev)
            )
         }, */
      }
   )
}
