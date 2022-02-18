import { RefObject, useEffect, useState } from "react"

export function useKeyPress(targetKey: string, ref: RefObject<HTMLElement>): boolean {
   const [keyPressed, setKeyPressed] = useState<boolean>(false)

   function downHandler(e: globalThis.KeyboardEvent) {
      if (e.key === targetKey) {
         e.stopPropagation()
         setKeyPressed(true)
      }
   }

   function upHandler(e: globalThis.KeyboardEvent) {
      if (e.key === targetKey) {
         e.stopPropagation()
         setKeyPressed(false)
      }
   }

   useEffect(() => {
      const currentRef = ref.current
      currentRef?.addEventListener("keydown", downHandler)
      currentRef?.addEventListener("keyup", upHandler)

      return () => {
         currentRef?.removeEventListener("keydown", downHandler)
         currentRef?.removeEventListener("keyup", upHandler)
      }
   })

   return keyPressed
}
