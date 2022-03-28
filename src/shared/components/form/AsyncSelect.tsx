import { Select, SelectProps, Spinner } from "@chakra-ui/react"
import React from "react"
import { X } from "react-feather"

export type AsyncSelectProps = {
   isLoading?: boolean
   isError?: boolean
   withEmptyOption?: boolean
   emptyOptionLabel?: string
} & SelectProps

export const AsyncSelect = React.forwardRef<HTMLSelectElement, AsyncSelectProps>(
   (
      { isError, isLoading, isDisabled, withEmptyOption, emptyOptionLabel, children, ...rest },
      ref
   ) => {
      return (
         <Select
            {...rest}
            ref={ref}
            isDisabled={isLoading || isDisabled || isError}
            icon={isLoading ? <Spinner /> : isError ? <X /> : undefined}
            placeholder={withEmptyOption ? emptyOptionLabel || "Seleccionar" : undefined}
            textColor="white"
            css={{ "& > option": { color: "white" } }}
         >
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
