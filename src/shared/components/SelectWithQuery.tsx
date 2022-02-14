import { AxiosError } from "axios"
import { UseQueryResult } from "react-query"
import AsyncSelect, { AsyncSelectProps } from "./form/AsyncSelect"

type ExtractArray<T> = T extends (infer U)[] ? U : T

type SelectWithQueryProps<T> = {
   query: () => UseQueryResult<T, AxiosError>
   mapOptionsTo: { value: keyof ExtractArray<T>; label: keyof ExtractArray<T> }
   onChange: (value: string) => void
   value?: string
} & Omit<AsyncSelectProps, "onChange">

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectWithQuery<T extends Record<keyof ExtractArray<T>, any>[]>({
   query,
   mapOptionsTo,
   onChange,
   value,
   ...rest
}: SelectWithQueryProps<T>) {
   const { data, isLoading, isError } = query()

   return (
      <AsyncSelect
         isLoading={isLoading}
         isError={isError}
         onChange={e => onChange(e.target.value)}
         value={value}
         {...rest}
      >
         {data?.map(val => (
            <option key={val[mapOptionsTo.value]} value={val[mapOptionsTo.value]}>
               {val[mapOptionsTo.label]}
            </option>
         ))}
      </AsyncSelect>
   )
}

export default SelectWithQuery
