import React, { useState, useEffect } from "react"
import { useKeyPress } from "."

export function useRoveFocus(
   size: number,
   ref: React.RefObject<HTMLElement>
): [currentFocus: number, setCurrentFocus: React.Dispatch<React.SetStateAction<number>>] {
   const [currentFocus, setCurrentFocus] = useState(0)
   const keyUp = useKeyPress("ArrowUp", ref)
   const keyDown = useKeyPress("ArrowDown", ref)

   useEffect(() => {
      if (keyUp) {
         setCurrentFocus(prev => (prev === 0 ? size - 1 : prev - 1))
      }
   }, [keyUp, size])

   useEffect(() => {
      if (keyDown) {
         setCurrentFocus(prev => (prev === size - 1 ? 0 : prev + 1))
      }
   }, [keyDown, size])

   return [currentFocus, setCurrentFocus]
}
