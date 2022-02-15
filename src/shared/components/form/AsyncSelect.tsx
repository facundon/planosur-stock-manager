import { Input, Select, SelectProps, Spinner } from "@chakra-ui/react"
import React from "react"
import { X } from "react-feather"

export type AsyncSelectProps = {
   isLoading?: boolean
   isError?: boolean
   withEmptyOption?: boolean
} & SelectProps

const AsyncSelect = React.forwardRef<HTMLSelectElement, AsyncSelectProps>(
   ({ isError, isLoading, isDisabled, withEmptyOption, children, ...rest }, ref) => {
      return (
         <Select
            {...rest}
            ref={ref}
            isDisabled={isLoading || isDisabled || isError}
            icon={isLoading ? <Spinner /> : isError ? <X /> : undefined}
            placeholder={withEmptyOption ? "Seleccionar" : undefined}
         >
            <Input />
            {isLoading ? (
               <option>Cargando...</option>
            ) : isError ? (
               <option>Error al cargar opciones</option>
            ) : (
               children
            )}
         </Select>
      )
   }
)

export default AsyncSelect
