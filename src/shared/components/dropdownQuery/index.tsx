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
   useOutsideClick,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import { useEffect, useRef, useState } from "react"
import { AlertTriangle, X } from "react-feather"
import { UseQueryResult } from "react-query"
import { useDebounce, useKeyPress, useRoveFocus } from "../../hooks"
import { DropdownButton } from "./DropdownButton"

type ExtractArray<T> = T extends (infer U)[] ? U : T

type DropdownQueryProps<T> = {
   query: (props: Record<string, unknown>) => UseQueryResult<T, AxiosError>
   mapOptionsTo: { value: keyof ExtractArray<T>; label: keyof ExtractArray<T> }
   onChange: (data: ExtractArray<T>) => void
   value?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DropdownQuery<T extends Record<string, any>>({
   query,
   mapOptionsTo,
   onChange,
   value,
}: DropdownQueryProps<T>) {
   const [menuOpen, setMenuOpen] = useBoolean(false)
   const [didSelect, setDidSelect] = useBoolean(false)
   const [shouldOpen, setShouldOpen] = useBoolean(false)

   const [searchValue, setSearchValue] = useState("")
   const debouncedSearchValue = useDebounce(searchValue, 500)

   const wrapperRef = useRef<HTMLDivElement>(null)
   const escapePress = useKeyPress("Escape", wrapperRef)

   const { data, isLoading, isError, isRefetching, isSuccess } = query({
      searchVal: debouncedSearchValue,
      enabled: !didSelect && Boolean(debouncedSearchValue),
   })

   const inputRef = useRef<HTMLInputElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const [cursor, setCursor] = useRoveFocus(
      data?.some((d: ExtractArray<T>) => value === d[mapOptionsTo.value])
         ? data?.length - 1
         : data?.length,
      containerRef
   )

   function handleClick(selectVal: ExtractArray<T>) {
      onChange(selectVal)
      setMenuOpen.off()
      setDidSelect.on()
      setSearchValue(selectVal[mapOptionsTo.label])
      inputRef.current?.focus()
      setCursor(0)
   }

   useEffect(() => {
      if (escapePress && menuOpen && shouldOpen) {
         setShouldOpen.off()
         setMenuOpen.off()
         inputRef.current?.select()
      }
   }, [escapePress, setCursor, setMenuOpen, menuOpen, setShouldOpen, shouldOpen])

   useEffect(() => {
      if (!didSelect && isSuccess && Boolean(debouncedSearchValue) && !menuOpen && shouldOpen) {
         setMenuOpen.on()
      }
   }, [debouncedSearchValue, didSelect, isSuccess, menuOpen, setMenuOpen, shouldOpen])

   useOutsideClick({
      ref: wrapperRef,
      enabled: menuOpen,
      handler: () => {
         setShouldOpen.off()
         setMenuOpen.off()
      },
   })

   return (
      <Box ref={wrapperRef}>
         <Popover
            isOpen={menuOpen}
            gutter={5}
            autoFocus={false}
            matchWidth
            isLazy
            lazyBehavior="unmount"
         >
            <PopoverTrigger>
               <InputGroup>
                  <Input
                     _placeholder={{ color: "gray.500" }}
                     isInvalid={isError}
                     ref={inputRef}
                     placeholder="Buscar"
                     bgColor="secondary"
                     color="text"
                     fontWeight="600"
                     value={searchValue}
                     onClick={e => e.currentTarget.select()}
                     onChange={e => {
                        setSearchValue(e.target.value)
                        if (!shouldOpen) setShouldOpen.on()
                        if (didSelect) setDidSelect.off()
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
               <Box ref={containerRef}>
                  {data?.length ? (
                     data
                        .filter((d: ExtractArray<T>) => value !== d[mapOptionsTo.value])
                        .map((d: ExtractArray<T>, i: number) => (
                           <DropdownButton
                              key={i}
                              index={i}
                              focus={cursor === i}
                              setFocus={setCursor}
                              onClick={() => handleClick(d)}
                           >
                              {d[mapOptionsTo.label]}
                           </DropdownButton>
                        ))
                  ) : (
                     <Button
                        leftIcon={<Icon as={X} fontSize={20} />}
                        colorScheme="red"
                        tabIndex={-1}
                        disabled
                        isFullWidth
                        variant="ghost"
                        justifyContent="flex-start"
                        fontStyle="italic"
                     >
                        No se encontraron resultados
                     </Button>
                  )}
               </Box>
            </PopoverContent>
         </Popover>
      </Box>
   )
}

export default DropdownQuery
