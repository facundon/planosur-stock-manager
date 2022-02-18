import { ButtonProps, Button } from "@chakra-ui/react"
import { useRef, useEffect, useCallback } from "react"

type DropdownButtonProps = {
   focus: boolean
   setFocus: React.Dispatch<React.SetStateAction<number>>
   isSelected?: boolean
   index: number
} & ButtonProps

export function DropdownButton({
   focus,
   setFocus,
   index,
   isSelected,
   children,
   onClick,
   ...rest
}: DropdownButtonProps) {
   const ref = useRef<HTMLButtonElement>(null)

   useEffect(() => {
      if (focus && ref.current) {
         ref.current.focus()
      }
   }, [focus])

   const handleSelect = useCallback(() => {
      setFocus(index)
   }, [index, setFocus])

   return (
      <Button
         tabIndex={!isSelected && focus ? 0 : -1}
         isFullWidth
         isActive={!isSelected && focus}
         disabled={isSelected}
         colorScheme={isSelected ? "yellow" : "gray"}
         fontStyle={isSelected ? "italic" : "normal"}
         fontWeight={isSelected ? "600" : "400"}
         variant="ghost"
         justifyContent="flex-start"
         ref={ref}
         onKeyPress={handleSelect}
         onClick={e => {
            handleSelect()
            onClick && onClick(e)
         }}
         {...rest}
      >
         {children}
      </Button>
   )
}
