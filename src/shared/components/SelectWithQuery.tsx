import { AxiosError } from "axios"
import { UseQueryResult } from "react-query"
import AsyncSelect, { AsyncSelectProps } from "./form/AsyncSelect"

type ExtractArray<T> = T extends (infer U)[] ? U : T

type SelectWithQueryProps<T> = {
   query: () => UseQueryResult<T, AxiosError>
   mapOptionsTo: { value: keyof ExtractArray<T>; label: keyof ExtractArray<T> }
   onChange: (value: string) => void
} & Omit<AsyncSelectProps, "onChange">

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectWithQuery<T extends Record<keyof ExtractArray<T>, any>[]>({
   query,
   mapOptionsTo,
   onChange,
   ...rest
}: SelectWithQueryProps<T>) {
   const { data, isLoading, isError } = query()
   return (
      <AsyncSelect
         isLoading={isLoading}
         isError={isError}
         onChange={e => onChange(e.target.value)}
         {...rest}
      >
         {data?.map(value => (
            <option key={value[mapOptionsTo.value]} value={value[mapOptionsTo.value]}>
               {value[mapOptionsTo.label]}
            </option>
         ))}
      </AsyncSelect>
   )
}

export default SelectWithQuery
