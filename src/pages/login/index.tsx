import { Center, PinInput, PinInputField, Icon, Spinner, Progress } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../auth"
import { PlanosurLogo } from "../../shared/assets"

const LoginPage: React.FC = () => {
   const { login, isError, isLoading } = useAuth()
   const [value, setValue] = useState("")
   const firstInputRef = useRef<HTMLInputElement>(null)

   useEffect(() => {
      if (isError) {
         setValue("")
         firstInputRef.current?.focus()
      }
   }, [isError])

   return (
      <>
         <Center pos="absolute" left={0} right={0} top={20}>
            <Icon as={PlanosurLogo} color="red.500" w={300} h="auto" />
         </Center>

         <Center gap={2} h="100vh">
            <PinInput
               value={value}
               onComplete={login}
               onChange={setValue}
               isInvalid={isError && value === ""}
               isDisabled={isLoading}
               placeholder="🔑"
               variant="filled"
               size="lg"
               type="alphanumeric"
               focusBorderColor="yellow.400"
               autoFocus
               mask
               manageFocus
               otp
            >
               <PinInputField ref={firstInputRef} />
               <PinInputField />
               <PinInputField />
               <PinInputField />
               <PinInputField />
               <PinInputField />
            </PinInput>
            {isLoading && (
               <Progress
                  colorScheme="yellow"
                  size="xs"
                  isIndeterminate
                  w={340}
                  pos="absolute"
                  transform="auto"
                  translateY="3em"
               />
            )}
         </Center>
      </>
   )
}

export default LoginPage
