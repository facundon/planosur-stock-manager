import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import { AddCategoryFormDto, Category, UpdateCategoryFormDto } from "./domain"
import { CATEGORIES_KEYS } from "./queryKeys"

export function useCategoryQuery(id: number): UseQueryResult<Category> {
   return useQuery(CATEGORIES_KEYS.byId(id), async () => {
      const response = await apiClient.get<Category>(`/categories/${id}`)
      return response.data
   })
}

export function useCategoriesQuery(): UseQueryResult<Category[]> {
   return useQuery(CATEGORIES_KEYS.base, async () => {
      const response = await apiClient.get<Category[]>("/categories")
      return response.data
   })
}

export function useUpdateCategoryQuery(
   id: number,
   form: UpdateCategoryFormDto
): UseMutationResult<Category> {
   return useMutation(async () => {
      const response = await apiClient.patch<Category>(`/categories/${id}`, form)
      return response.data
   })
}

export function useDeleteCategoryQuery(id: number): UseMutationResult<Category> {
   return useMutation(async () => {
      const response = await apiClient.delete<Category>(`/categories/${id}`)
      return response.data
   })
}

export function useAddCategoryQuery(): UseMutationResult<Category, Error, AddCategoryFormDto> {
   return useMutation(async form => {
      const response = await apiClient.post<Category>("/categories", form)
      if (response instanceof Error) throw Error(response.message)
      return response.data
   })
}
