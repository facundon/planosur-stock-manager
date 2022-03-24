import { Center, PinInput, PinInputField, Box, Icon } from "@chakra-ui/react"
import { useAuth } from "../../auth"
import { PlanosurLogo } from "../../shared/assets"

const LoginPage: React.FC = () => {
   const { login } = useAuth()

   return (
      <>
         <Center pos="absolute" left={0} right={0} top={20}>
            <Icon as={PlanosurLogo} color="red.500" w={300} h="auto" />
         </Center>

         <Center gap={2} h="100vh">
            <PinInput
               size="lg"
               type="alphanumeric"
               onComplete={value => login(value)}
               mask
               manageFocus
               otp
            >
               <PinInputField />
               <PinInputField />
               <PinInputField />
               <PinInputField />
               <PinInputField />
               <PinInputField />
            </PinInput>
         </Center>
      </>
   )
}

export default LoginPage
