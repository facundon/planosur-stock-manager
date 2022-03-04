import {
   Box,
   FormControl,
   FormErrorMessage,
   HStack,
   Icon,
   IconButton,
   Input,
   Select,
   Switch,
   Text,
} from "@chakra-ui/react"
import { css } from "@emotion/react"
import { ChangeEvent, useMemo } from "react"
import { X } from "react-feather"
import { Control, Controller, Noop, UseFormRegister } from "react-hook-form"
import { useCategoriesQuery } from "../../entities/categories/queries"
import { useProvidersQuery } from "../../entities/providers/queries"
import AsyncSelect from "../../shared/components/form/AsyncSelect"
import { Filter, FilterInputKind, FiltersDto } from "./filtersConfig"

type KindFieldProps = {
   kind: FilterInputKind | undefined
   onChange: (event: ChangeEvent) => void
   name: string
   onBlur: Noop
   value: string | number | boolean | Date | undefined
   isLoading?: boolean
   isError?: boolean
}

const KindField: React.FC<KindFieldProps> = ({
   kind,
   value,
   children,
   isLoading,
   isError,
   ...rest
}) => {
   switch (kind) {
      case "checkbox":
         return <Switch {...rest} checked={value as boolean} isChecked={value as boolean} />
      case "date":
         return (
            <Input
               {...rest}
               value={value as string}
               type="date"
               css={css`
                  ::-webkit-calendar-picker-indicator {
                     filter: invert(1);
                  }
               `}
            />
         )
      case "number":
         return <Input {...rest} value={value as number} type="number" />
      case "text":
         return <Input {...rest} value={value as number} type="search" />
      case "select":
         return (
            <AsyncSelect
               {...rest}
               value={value as string}
               withEmptyOption
               isLoading={isLoading}
               isError={isError}
            >
               {children}
            </AsyncSelect>
         )
      default:
         return null
   }
}

export type FilterData = { filter: string; value: string }
type FilterPropsItem = {
   control: Control<FiltersDto, object>
   index: number
   register: UseFormRegister<FiltersDto>
   onRemove: Noop
   removeDisabled: boolean
} & Filter

export const FilterItem: React.FC<FilterPropsItem> = ({
   label,
   accessor,
   options,
   inputKind,
   index,
   control,
   rules,
   register,
   onRemove,
   initialValue,
   removeDisabled,
}) => {
   const {
      data: providers,
      isLoading: isLoadingProviders,
      isError: isProvidersError,
   } = useProvidersQuery(accessor === "provider")
   const {
      data: categories,
      isLoading: isLoadingCategories,
      isError: isCategoriesError,
   } = useCategoriesQuery(accessor === "category")

   const isLoading = useMemo(
      () => (accessor === "category" ? isLoadingCategories : isLoadingProviders),
      [accessor, isLoadingCategories, isLoadingProviders]
   )
   const isError = useMemo(
      () => (accessor === "category" ? isCategoriesError : isProvidersError),
      [accessor, isCategoriesError, isProvidersError]
   )

   return (
      <Box w="100%" display="flex" flexWrap="wrap" alignItems="center" gap={3}>
         <Text minW={32} fontWeight={600} flexBasis="fit-content" color="yellow.500">
            {label}
         </Text>

         <HStack flexGrow={1}>
            {options && (
               <Select
                  {...register(`filters.${index}.condition`)}
                  minWidth={40}
                  flex={1}
                  variant="flushed"
               >
                  {options.map(option => (
                     <option key={`${accessor}-${option.value}`} value={option.value}>
                        {option.label}
                     </option>
                  ))}
               </Select>
            )}

            <Controller
               rules={{ required: { value: true, message: "Ingrese un valor" }, ...rules }}
               control={control}
               defaultValue={initialValue}
               name={`filters.${index}.value`}
               // eslint-disable-next-line @typescript-eslint/no-unused-vars
               render={({ field: { ref, ...rest }, fieldState: { error } }) => {
                  return (
                     <FormControl isInvalid={!!error?.message} minWidth={20} flex={1}>
                        <KindField
                           kind={inputKind}
                           {...rest}
                           isLoading={isLoading}
                           isError={isError}
                        >
                           {accessor === "provider" &&
                              providers?.map(provider => (
                                 <option key={provider.id} value={provider.id}>
                                    {provider.name}
                                 </option>
                              ))}

                           {accessor === "category" &&
                              categories?.map(category => (
                                 <option key={category.id} value={category.id}>
                                    {category.name}
                                 </option>
                              ))}
                        </KindField>
                        <FormErrorMessage>{error?.message}</FormErrorMessage>
                     </FormControl>
                  )
               }}
            />
            <IconButton
               display={{ base: "none", sm: "block" }}
               disabled={removeDisabled}
               aria-label="Eliminar"
               title="Eliminar"
               size="sm"
               isRound
               colorScheme="red"
               variant="link"
               icon={<Icon w={5} h="auto" as={X} />}
               onClick={onRemove}
            />
         </HStack>
      </Box>
   )
}
