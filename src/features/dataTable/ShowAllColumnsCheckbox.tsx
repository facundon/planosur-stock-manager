import {
   Checkbox,
   IconButton,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   PopoverTrigger,
   Portal,
   Stack,
} from "@chakra-ui/react"
import { Columns } from "react-feather"
import { TableToggleHideAllColumnProps, ColumnInstance } from "react-table"

type ShowAllColumnsCheckboxProps = {
   allColumns: ColumnInstance<Record<string, unknown>>[]
} & TableToggleHideAllColumnProps

export const ShowAllColumnsCheckbox: React.FC<ShowAllColumnsCheckboxProps> = ({
   allColumns,
   indeterminate,
   checked,
   ...rest
}) => {
   return (
      <Popover>
         <PopoverTrigger>
            <IconButton aria-label="Columnas" title="Columnas" variant="ghost" icon={<Columns />} />
         </PopoverTrigger>
         <Portal>
            <PopoverContent maxW="max-content">
               <PopoverArrow />
               <PopoverHeader fontWeight={600}>Columnas</PopoverHeader>
               <PopoverCloseButton />
               <PopoverBody maxW="max-content">
                  <Checkbox {...rest} isIndeterminate={indeterminate} isChecked={checked}>
                     Ver todas
                  </Checkbox>
                  <Stack px={6} mt={1} spacing={1} maxW="max-content">
                     {allColumns.map(column => (
                        <Checkbox
                           size="sm"
                           key={`${column.id}_checkbox`}
                           isChecked={column.getToggleHiddenProps().checked}
                           {...column.getToggleHiddenProps()}
                        >
                           {column.Header}
                        </Checkbox>
                     ))}
                  </Stack>
               </PopoverBody>
            </PopoverContent>
         </Portal>
      </Popover>
   )
}
