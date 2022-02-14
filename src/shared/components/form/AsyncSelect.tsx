import { Select, SelectProps, Spinner } from "@chakra-ui/react"
import React from "react"

export type AsyncSelectProps = {
   isLoading?: boolean
   withEmptyOption?: boolean
} & SelectProps

const AsyncSelect = React.forwardRef<HTMLSelectElement, AsyncSelectProps>(
   ({ isLoading, withEmptyOption, children, ...rest }, ref) => {
      return (
         <Select
            {...rest}
            ref={ref}
            isDisabled={isLoading}
            icon={isLoading ? <Spinner /> : undefined}
         >
            {isLoading ? (
               <option>Cargando...</option>
            ) : (
               <>
                  {withEmptyOption && <option value="">-</option>}
                  {children}
               </>
            )}
         </Select>
      )
   }
)

export default AsyncSelect
