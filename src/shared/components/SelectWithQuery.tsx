import { AxiosError } from "axios"
import { UseQueryResult } from "react-query"
import { Text } from "@chakra-ui/react"
import AsyncSelect, { AsyncSelectProps } from "./form/AsyncSelect"

type ExtractArray<T> = T extends (infer U)[] ? U : T

type SelectWithQueryProps<T> = {
   error?: string
   query: () => UseQueryResult<T, AxiosError>
   mapOptionsTo: { value: keyof ExtractArray<T>; label: keyof ExtractArray<T> }
} & AsyncSelectProps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectWithQuery<T extends Record<keyof ExtractArray<T>, any>[]>({
   error,
   isDisabled,
   query,
   mapOptionsTo,
   ...rest
}: SelectWithQueryProps<T>) {
   const { data, isLoading } = query()
   return (
      <>
         <AsyncSelect isLoading={isLoading} isDisabled={isDisabled} {...rest}>
            {data?.map(value => (
               <option key={value[mapOptionsTo.value]} value={value[mapOptionsTo.value]}>
                  {value[mapOptionsTo.label]}
               </option>
            ))}
         </AsyncSelect>
         {error && (
            <Text mt={5} color="error">
               {error}
            </Text>
         )}
      </>
   )
}

export default SelectWithQuery
