import { HStack, Heading, Stack } from '@hope-ui/solid'
import Navigation from './Navigation'

const Header = () => {
  return (
    <Stack
      w="$full"
      p="$20"
      bg="$blackAlpha5"
      justifyContent="space-between"
      direction={{ '@initial': 'column', '@md': 'row' }}
      alignItems="center"
    >
      <Heading fontSize="$4xl">Carspotter Daily</Heading>
      <Navigation />
    </Stack>
  )
}

export default Header
