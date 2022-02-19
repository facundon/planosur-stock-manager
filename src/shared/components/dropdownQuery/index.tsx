import {
   Box,
   Button,
   Icon,
   IconButton,
   Input,
   InputGroup,
   InputRightElement,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Spinner,
   useBoolean,
   useColorModeValue,
   useOutsideClick,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import { useCallback, useRef, useState } from "react"
import { AlertTriangle, Edit3, X } from "react-feather"
import { UseQueryResult } from "react-query"
import { useRoveFocus } from "../../hooks"
import { DropdownButton } from "./DropdownButton"

type ExtractArray<T> = T extends (infer U)[] ? U : T

type DropdownQueryProps<T> = {
   query: (props: Record<string, unknown>) => UseQueryResult<T, AxiosError>
   mapOptionsTo: { value: keyof ExtractArray<T>; label: keyof ExtractArray<T> }
   onChange: (value: string | undefined) => void
   initSearchVal?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DropdownQuery<T extends Record<string, any>>({
   query,
   mapOptionsTo,
   onChange,
   initSearchVal = "",
}: DropdownQueryProps<T>) {
   const inputPlaceholderColor = useColorModeValue("gray.100", "gray.600")
   const [menuOpen, setMenuOpen] = useBoolean(false)
   const [queryEnabled, setQueryEnabled] = useBoolean(false)
   const [didSelect, setDidSelect] = useBoolean(false)

   const [searchValue, setSearchValue] = useState(initSearchVal)

   const wrapperRef = useRef<HTMLDivElement>(null)

   const { data, isLoading, isError, isRefetching } = query({
      searchVal: searchValue.trim().toLowerCase(),
      enabled: queryEnabled && Boolean(searchValue),
      simple: true,
   })

   const inputRef = useRef<HTMLInputElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const [cursor, setCursor] = useRoveFocus(data?.length, containerRef)

   const handleClick = useCallback(
      (selectVal: ExtractArray<T>) => {
         setQueryEnabled.off()
         setMenuOpen.off()
         setDidSelect.on()
         onChange(selectVal[mapOptionsTo.value])
         setSearchValue(selectVal[mapOptionsTo.label].trim())
      },
      [mapOptionsTo.label, mapOptionsTo.value, onChange, setDidSelect, setMenuOpen, setQueryEnabled]
   )

   const handleBlur = useCallback(
      e => {
         const currentTarget = e.currentTarget
         // Give browser time to focus the next element
         requestAnimationFrame(() => {
            // Check if the new focused element is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
               setMenuOpen.off()
            }
         })
      },
      [setMenuOpen]
   )

   useOutsideClick({
      ref: wrapperRef,
      enabled: menuOpen,
      handler: setMenuOpen.off,
   })

   return (
      <Box
         ref={wrapperRef}
         onBlur={handleBlur}
         onKeyDown={e => {
            if (e.key === "Escape" && menuOpen) {
               e.stopPropagation()
               setMenuOpen.off()
               inputRef.current?.select()
            }
         }}
      >
         <Popover isOpen={menuOpen} gutter={5} autoFocus={false} matchWidth>
            <PopoverTrigger>
               <InputGroup>
                  <Input
                     _placeholder={{ color: inputPlaceholderColor }}
                     isInvalid={isError}
                     ref={inputRef}
                     placeholder="Buscar"
                     bgColor="primary"
                     color="blackAlpha.900"
                     fontWeight="600"
                     value={searchValue}
                     disabled={didSelect}
                     onClick={e => e.currentTarget.select()}
                     onKeyPress={e => {
                        if (e.key === "Enter") {
                           setQueryEnabled.on()
                           setMenuOpen.on()
                           setCursor(0)
                        }
                     }}
                     onChange={e => {
                        setSearchValue(e.target.value)
                        if (queryEnabled) setQueryEnabled.off()
                        if (menuOpen) setMenuOpen.off()
                     }}
                  />
                  {(isLoading || isRefetching) && (
                     <InputRightElement color="primaryContrast" mr={3} pointerEvents="none">
                        <Spinner />
                     </InputRightElement>
                  )}
                  {isError && (
                     <InputRightElement color="red.500" mr={3}>
                        <AlertTriangle />
                     </InputRightElement>
                  )}
                  {(!isLoading || !isRefetching) && didSelect && (
                     <InputRightElement>
                        <IconButton
                           aria-label="Editar"
                           title="Editar"
                           variant="link"
                           color="primaryContrastDisabled"
                           icon={<Edit3 />}
                           onClick={() => {
                              setDidSelect.off()
                              onChange(undefined)
                              setTimeout(() => inputRef.current?.select())
                           }}
                        />
                     </InputRightElement>
                  )}
               </InputGroup>
            </PopoverTrigger>
            <PopoverContent width="100%">
               <Box ref={containerRef}>
                  {data?.length ? (
                     data.map((d: ExtractArray<T>, i: number) => (
                        <DropdownButton
                           key={i}
                           isFocus={cursor === i}
                           onClick={() => handleClick(d)}
                        >
                           {d[mapOptionsTo.label]}
                        </DropdownButton>
                     ))
                  ) : data?.length ? (
                     <DropdownButton isSelect isFocus={false}>
                        {data[0][mapOptionsTo.label]}
                     </DropdownButton>
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
