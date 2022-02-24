import { HStack, Icon, IconButton, Input, Select, Switch, Text } from "@chakra-ui/react"
import { useState } from "react"
import { X } from "react-feather"
import { Filter, FilterOptionsKind } from "./filtersConfig"

type FilterPropsItem = Filter

const KindField: React.FC<{ kind: FilterOptionsKind | undefined }> = ({ kind }) => {
   switch (kind) {
      case "checkbox":
         return <Switch />
      case "date":
         return <Input type="date" />
      case "text":
         return <Input type="number" />
      case "select":
         return <Select></Select>
      default:
         return null
   }
}

export const FilterItem: React.FC<FilterPropsItem> = ({ label, accessor, options, value }) => {
   const [kind, setKind] = useState<FilterOptionsKind>()

   return (
      <HStack w="100%">
         <Text minW={32}>{label}</Text>

         <Select
            onChange={e => setKind(e.target.value as FilterOptionsKind)}
            placeholder="Seleccionar"
         >
            {options.map(option => (
               <option key={`${accessor}-${option.value}`} value={option.kind}>
                  {option.label}
               </option>
            ))}
         </Select>

         <KindField kind={kind} />

         <IconButton
            aria-label="Eliminar"
            title="Eliminar"
            size="sm"
            isRound
            colorScheme="red"
            variant="link"
            icon={<Icon w={5} h="auto" as={X} />}
         />
      </HStack>
   )
}
