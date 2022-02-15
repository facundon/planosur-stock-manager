import {
   FormControl,
   FormLabel,
   InputGroup,
   InputLeftElement,
   Input,
   FormErrorMessage,
} from "@chakra-ui/react"
import React from "react"
import { Phone, DollarSign, AtSign } from "react-feather"
import AsyncSelect from "./AsyncSelect"
import { FormFieldProps } from "./types"

export const FormField = React.forwardRef<HTMLInputElement | HTMLSelectElement, FormFieldProps>(
   (
      {
         error,
         isLoading,
         data: { label, type, required, options, isLoadingOptions, name, withEmptyOption },
         ...rest
      },
      ref
   ) => {
      const shouldRenderIcon = name === "phone" || type === "email" || name === "price"

      return (
         <FormControl isInvalid={!!error} isRequired={required} isDisabled={isLoading}>
            <FormLabel>{label}</FormLabel>
            {type === "select" ? (
               <AsyncSelect
                  {...rest}
                  ref={ref as React.ForwardedRef<HTMLSelectElement>}
                  withEmptyOption={withEmptyOption}
                  isLoading={isLoadingOptions}
               >
                  {options?.map(option => (
                     <option key={option.value} value={option.value}>
                        {option.label}
                     </option>
                  ))}
               </AsyncSelect>
            ) : (
               <InputGroup>
                  {shouldRenderIcon && (
                     <InputLeftElement pointerEvents="none" color="gray.300">
                        {name === "phone" && <Phone strokeWidth={1} size={18} />}
                        {name === "price" && <DollarSign strokeWidth={1} size={18} />}
                        {type === "email" && <AtSign strokeWidth={1} size={18} />}
                     </InputLeftElement>
                  )}
                  <Input type={type} {...rest} ref={ref as React.ForwardedRef<HTMLInputElement>} />
               </InputGroup>
            )}
            <FormErrorMessage>{error}</FormErrorMessage>
         </FormControl>
      )
   }
)
