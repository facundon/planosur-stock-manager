import { HStack, Icon, IconButton, Input, Select, Switch, Text } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { X } from "react-feather"
import { Control, Controller, Noop, UseFormRegister } from "react-hook-form"
import { Filter, FilterInputKind, FiltersDto } from "./filtersConfig"

type KindFieldProps = {
   kind: FilterInputKind | undefined
   onChange: (event: ChangeEvent) => void
   name: string
   onBlur: Noop
   value: string | number | boolean | Date
}

const KindField: React.FC<KindFieldProps> = ({ kind, value, ...rest }) => {
   switch (kind) {
      case "checkbox":
         return <Switch {...rest} checked={value as boolean} />
      case "date":
         return <Input {...rest} value={value as string} type="date" />
      case "text":
         return <Input {...rest} value={value as number} type="number" />
      case "select":
         return <Select {...rest} value={value as string}></Select>
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
   onRemove,
}) => {
   return (
      <HStack w="100%">
         <Text minW={32}>{label}</Text>

         <Select placeholder="Seleccionar" {...register(`filters.${index}.condition`)}>
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
            render={({ field: { ref, ...rest } }) => <KindField kind={inputKind} {...rest} />}
         />

         <IconButton
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
   )
}
