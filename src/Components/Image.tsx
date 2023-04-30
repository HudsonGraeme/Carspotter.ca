import { createSignal } from 'solid-js'
import { VStack, Image as HopeImage, Text, useColorModeValue, ImageProps } from '@hope-ui/solid'
import Crash from './Asset/crash'

const Image = ({ src, ...otherProps }: ImageProps) => {
  const [loaded, setLoaded] = createSignal(false)
  const errorTextColor = useColorModeValue('$blackAlpha10', '$whiteAlpha10')
  return (
    <>
      <HopeImage
        src={src}
        onLoad={() => setLoaded(true)}
        display={loaded() ? 'block' : 'none'}
        transition="opacity 0.5s ease-out"
        opacity={loaded() ? 1 : 0}
        {...otherProps}
      />
      <VStack
        w="$full"
        h="$xs"
        bg="$blackAlpha10"
        display={loaded() ? 'none' : 'flex'}
        justifyContent="center"
        color={errorTextColor()}
      >
        <Crash w="$32" h="$32" css={{ fill: errorTextColor() }} />
        <Text>No Image Available</Text>
      </VStack>
    </>
  )
}

export default Image
