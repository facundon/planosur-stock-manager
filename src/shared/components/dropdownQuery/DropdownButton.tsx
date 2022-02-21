import { ButtonProps, Button } from "@chakra-ui/react"
import { useRef, useLayoutEffect } from "react"

type DropdownButtonProps = {
   isFocus: boolean
   isSelect?: boolean
} & ButtonProps

export function DropdownButton({ isFocus, isSelect, children, ...rest }: DropdownButtonProps) {
   const ref = useRef<HTMLButtonElement>(null)

   useLayoutEffect(() => {
      if (isFocus && ref.current) {
         ref.current.focus()
      }
   }, [isFocus])

   return (
      <Button
         _active={{ bg: "yellow.200", color: "yellow.800" }}
         tabIndex={!isSelect && isFocus ? 0 : -1}
         isFullWidth
         isActive={!isSelect && isFocus}
         disabled={isSelect}
         colorScheme={isSelect ? "yellow" : "gray"}
         fontStyle={isSelect ? "italic" : "normal"}
         fontWeight={isSelect ? "600" : "400"}
         variant="ghost"
         justifyContent="flex-start"
         ref={ref}
         {...rest}
      >
         {children}
      </Button>
   )
}
