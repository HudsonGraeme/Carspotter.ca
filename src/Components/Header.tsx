import { HStack, Heading } from '@hope-ui/solid'
import Navigation from './Navigation'

const Header = () => {
  return (
    <HStack w="$full" p="$20" bg="$blackAlpha5" justifyContent="space-between">
      <Heading fontSize="$4xl">Carspotter Daily</Heading>
      <Navigation />
    </HStack>
  )
}

export default Header
