import {
   Box,
   Button,
   Icon,
   Input,
   InputGroup,
   InputRightElement,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Spinner,
   useBoolean,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { AlertTriangle, X } from "react-feather"
import { UseQueryResult } from "react-query"
import { useDebounce } from "../hooks/useDebounce"

type ExtractArray<T> = T extends (infer U)[] ? U : T

type SelectWithQueryProps<T> = {
   query: (props: Record<string, unknown>) => UseQueryResult<T, AxiosError>
   mapOptionsTo: { value: keyof ExtractArray<T>; label: keyof ExtractArray<T> }
   onChange: (data: ExtractArray<T>) => void
   value?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectWithQuery<T extends Record<string, any>>({
   query,
   mapOptionsTo,
   onChange,
   value,
}: SelectWithQueryProps<T>) {
   const [menuOpen, setMenuOpen] = useBoolean(false)
   const [didSelect, setDidSelect] = useBoolean(false)
   const [searchValue, setSearchValue] = useState("")
   const debouncedSearchValue = useDebounce(searchValue, 500)

   const { data, isLoading, isError, isRefetching } = query({
      searchVal: debouncedSearchValue,
      enabled: !didSelect && !!debouncedSearchValue,
   })

   function handleClick(selectVal: ExtractArray<T>) {
      onChange(selectVal)
      setMenuOpen.off()
      setDidSelect.on()
      setSearchValue(selectVal[mapOptionsTo.label])
   }

   useEffect(() => {
      if (!didSelect && (!isLoading || !isRefetching) && !!debouncedSearchValue) {
         setMenuOpen.on()
      }
   }, [debouncedSearchValue, didSelect, isLoading, isRefetching, setMenuOpen])

   return (
      <Box>
         <Popover
            isOpen={menuOpen}
            onClose={setMenuOpen.off}
            gutter={5}
            autoFocus={false}
            matchWidth
            closeOnEsc
         >
            <PopoverTrigger>
               <InputGroup>
                  <Input
                     isInvalid={isError}
                     _placeholder={{ color: "gray.500" }}
                     placeholder="Buscar"
                     bgColor="secondary"
                     color="text"
                     fontWeight="600"
                     value={searchValue}
                     onClick={e => e.currentTarget.select()}
                     onChange={e => {
                        setSearchValue(e.target.value)
                        setDidSelect.off()
                     }}
                  />
                  {(isLoading || isRefetching) && (
                     <InputRightElement color="text" mr={3}>
                        <Spinner />
                     </InputRightElement>
                  )}
                  {isError && (
                     <InputRightElement color="red.500" mr={3}>
                        <AlertTriangle />
                     </InputRightElement>
                  )}
               </InputGroup>
            </PopoverTrigger>
            <PopoverContent width="100%">
               {data?.length ? (
                  data.map((d: ExtractArray<T>, i: number) => (
                     <Button
                        key={i}
                        isFullWidth
                        colorScheme={value === d[mapOptionsTo.value] ? "yellow" : "gray"}
                        fontStyle={value === d[mapOptionsTo.value] ? "italic" : "normal"}
                        disabled={value === d[mapOptionsTo.value]}
                        fontWeight={value === d[mapOptionsTo.value] ? "600" : "400"}
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => handleClick(d)}
                     >
                        {d[mapOptionsTo.label]}
                     </Button>
                  ))
               ) : (
                  <Button
                     leftIcon={<Icon as={X} />}
                     colorScheme="gray"
                     disabled
                     isFullWidth
                     variant="ghost"
                     justifyContent="flex-start"
                     fontStyle="italic"
                  >
                     No se encontraron resultados
                  </Button>
               )}
            </PopoverContent>
         </Popover>
      </Box>
   )
}

export default SelectWithQuery
