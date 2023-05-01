import { createSignal } from 'solid-js'
import { VStack, Image as HopeImage, Text, useColorModeValue, ImageProps } from '@hope-ui/solid'
import Crash from './Asset/crash'
import Loading from './Asset/Loading'

const Image = ({ src, ...otherProps }: ImageProps) => {
  const [loaded, setLoaded] = createSignal(false)
  const [error, setError] = createSignal(false)
  const errorTextColor = useColorModeValue('$blackAlpha10', '$whiteAlpha10')
  const noImageBackgroundColor = useColorModeValue('$whiteAlpha10', '$blackAlpha10')
  return (
    <>
      <HopeImage
        src={src}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        transition="opacity 0.5s ease-out"
        opacity={loaded() ? 1 : 0}
        {...otherProps}
      />
      <Show when={!loaded() && !error() && src}>
        <VStack
          w="$full"
          h="$xs"
          bg={noImageBackgroundColor()}
          justifyContent="center"
          color={errorTextColor()}
          spacing="$4"
        >
          <Loading w="$32" h="$32" fill={'rgba(0,0,0,0.2)'} />
          <Text>Finding car...</Text>
        </VStack>
      </Show>
      <Show when={error() || !src}>
        <VStack w="$full" h="$xs" bg={noImageBackgroundColor()} justifyContent="center" color={errorTextColor()}>
          <Crash w="$32" h="$32" css={{ fill: errorTextColor() }} />
          <Text>Crashed while trying to deliver image...</Text>
        </VStack>
      </Show>
    </>
  )
}

export default Image
