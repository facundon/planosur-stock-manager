import { AxiosError } from "axios"
import {
   useMutation,
   UseMutationResult,
   useQuery,
   useQueryClient,
   UseQueryResult,
} from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import { addUpdater } from "../../shared/utils/queriesUpdater"
import { PRODUCTS_KEYS } from "../products/queryKeys"
import { CreateOrderDto, Order, OrderFilters, OrderWithProducts, UpdateOrderDto } from "./domain"
import { ORDER_KEYS } from "./queryKeys"

export function useOrderQuery({
   enabled,
   id,
}: {
   enabled?: boolean
   id: number
}): UseQueryResult<OrderWithProducts, AxiosError> {
   return useQuery(
      ORDER_KEYS.byId(id),
      async () => {
         const response = await apiClient.get<OrderWithProducts>(`/orders/${id}`)
         return response.data
      },
      { enabled }
   )
}

export function useOrdersQuery({
   enabled = true,
   ...filters
}: OrderFilters & {
   enabled?: boolean
}): UseQueryResult<Order[], AxiosError> {
   const queryKey = Object.entries(filters).map(filter => `${filter[0]}=${filter[1]}`)

   const query = queryKey.join("&")

   return useQuery(
      queryKey.length ? ORDER_KEYS.filtered(filters) : ORDER_KEYS.base,
      async () => {
         const response = await apiClient.get<Order[]>(`/orders${query ? `?${query}` : ""}`)
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
         onSuccess: () => {
            queryClient.invalidateQueries(PRODUCTS_KEYS.base)
            queryClient.invalidateQueries(ORDER_KEYS.base)
         },
      }
   )
}

export function useCreateOrderQuery(): UseMutationResult<Order, AxiosError, CreateOrderDto> {
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.post<Order>("/orders", form)
         return response.data
      },
      {
         onSuccess: data => {
            queryClient.setQueryData<Order[]>(ORDER_KEYS.base, prev => addUpdater(data, prev))
         },
      }
   )
}
