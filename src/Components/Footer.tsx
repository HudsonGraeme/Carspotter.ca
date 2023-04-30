import { Button, Stack, Text } from '@hope-ui/solid'
import Navigation from './Navigation'
import { FiExternalLink } from 'solid-icons/fi'
import { GITHUB_URL } from '../utilities/constants'

const Footer = () => {
  return (
    <Stack
      direction={{ '@initial': 'column', '@md': 'row' }}
      css={{ justifyContent: 'space-between !important' }}
      w="$full"
      px="$20"
      py="$8"
    >
      <Navigation />
      <Button
        colorScheme="neutral"
        variant="ghost"
        rightIcon={<FiExternalLink />}
        as="a"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Why is this site so fast?
      </Button>
      <Text>&copy; 2023 Carspotter Daily</Text>
    </Stack>
  )
}

export default Footer
