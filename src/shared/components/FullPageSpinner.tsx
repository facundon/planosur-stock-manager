import { Center, Spinner, SpinnerProps } from "@chakra-ui/react"

type FullPageSpinnerProps = unknown & SpinnerProps

const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({ ...rest }) => {
   return (
      <Center w="100vw" h="100vh" bg="gray.700" zIndex={1}>
         <Spinner w="25vw" h="25vw" color="red.400" thickness="5px" speed="1s" {...rest} />
      </Center>
   )
}

export default FullPageSpinner
