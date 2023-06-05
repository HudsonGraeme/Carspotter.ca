import { Image as HopeImage, ImageProps, Text, useColorModeValue, VStack } from '@hope-ui/solid'
import { createSignal, Show } from 'solid-js'
import Crash from './Asset/crash'
import Loading from './Asset/Loading'

const Image = ({ src, ...otherProps }: ImageProps) => {
  const [loaded, setLoaded] = createSignal(false)
  const [error, setError] = createSignal(false)
  const errorTextColor = useColorModeValue('$blackAlpha10', '$whiteAlpha10')
  const loadingFillColor = useColorModeValue('$blackAlpha7', '$whiteAlpha7')
  const noImageBackgroundColor = useColorModeValue('$whiteAlpha10', '$blackAlpha10')
  return (
    <>
      <Show when={!error()}>
        <HopeImage
          src={src}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          transition="opacity 0.5s ease-out"
          opacity={loaded() ? 1 : 0}
          {...otherProps}
        />
      </Show>
      <Show when={!loaded() && !error() && src}>
        <VStack
          minW="$sm"
          w="$full"
          h="$xs"
          bg={noImageBackgroundColor()}
          justifyContent="center"
          color={errorTextColor()}
          spacing="$4"
          p={4}
          {...otherProps}
        >
          <Loading w="$12" h="$12" css={{ fill: loadingFillColor() }} />
          <Text fontSize="$xs">Finding car...</Text>
        </VStack>
      </Show>
      <Show when={error() || !src}>
        <VStack
          minW="$sm"
          w="$full"
          h="$xs"
          bg={noImageBackgroundColor()}
          justifyContent="center"
          color={errorTextColor()}
          p={4}
          {...otherProps}
        >
          <Crash w="$12" h="$12" css={{ fill: errorTextColor() }} />
          <Text fontSize="$xs">Crashed while trying to deliver image...</Text>
        </VStack>
      </Show>
    </>
  )
}

export default Image
