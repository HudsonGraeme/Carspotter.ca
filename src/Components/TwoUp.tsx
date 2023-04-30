import { Stack } from '@hope-ui/solid'
import { JSXElement } from 'solid-js'

const TwoUp = ({ first, second }: { first: JSXElement; second: JSXElement }) => {
  return (
    <Stack spacing="$4" direction={{ '@md': 'row', '@sm': 'column' }} w="auto" maxW="1880px" justifyContent="center">
      {first}
      {second}
    </Stack>
  )
}
export default TwoUp
