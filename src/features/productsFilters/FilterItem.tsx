import { HStack, Input, Select, Switch, Text } from "@chakra-ui/react"
import { ChangeEvent, useMemo } from "react"
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
   value: string | number | boolean | Date
   isLoading?: boolean
   isError?: boolean
}

const KindField: React.FC<KindFieldProps> = ({ kind, value, children, ...rest }) => {
   switch (kind) {
      case "checkbox":
         return <Switch {...rest} checked={value as boolean} />
      case "date":
         return <Input {...rest} value={value as string} type="date" />
      case "text":
         return <Input {...rest} value={value as number} type="number" />
      case "select":
         return (
            <AsyncSelect {...rest} value={value as string}>
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
} & Filter

export const FilterItem: React.FC<FilterPropsItem> = ({
   label,
   accessor,
   options,
   inputKind,
   index,
   control,
   register,
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
      <HStack w="100%">
         <Text minW={32} fontWeight={600}>
            {label}
         </Text>

         <Select {...register(`filters.${index}.condition`)}>
            {options.map(option => (
               <option key={`${accessor}-${option.value}`} value={option.value}>
                  {option.label}
               </option>
            ))}
         </Select>

         <Controller
            control={control}
            name={`filters.${index}.value`}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { ref, ...rest } }) => (
               <KindField kind={inputKind} {...rest} isLoading={isLoading} isError={isError}>
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
            )}
         />

         {/*     <IconButton
            aria-label="Eliminar"
            title="Eliminar"
            size="sm"
            isRound
            colorScheme="red"
            variant="link"
            icon={<Icon w={5} h="auto" as={X} />}
            onClick={onRemove}
         /> */}
      </HStack>
   )
}
