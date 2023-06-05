import { Box, Flex, HStack, Text, useColorModeValue, VStack } from '@hope-ui/solid'
import { useNavigate } from '@solidjs/router'
import isEmpty from 'lodash/isEmpty'
import { FiExternalLink } from 'solid-icons/fi'
import { createSignal, For, Show } from 'solid-js'
import { BASE_URL_PLACEHOLDER } from '../utilities/constants'
import Button from './Button'
import Image from './Image'
const Carousel = ({ posts }) => {
  const [currentImage, setCurrentImage] = createSignal(0)
  const hoverColor = useColorModeValue('$whiteAlpha11', '$blackAlpha11')
  const navigate = useNavigate()
  const nextImage = () => {
    if (currentImage() + 1 < posts().length) {
      return currentImage() + 1
    }
    return 0
  }

  const prevImage = () => {
    if (currentImage() - 1 >= 0) {
      return currentImage() - 1
    }
    return posts().length - 1
  }

  return (
    <Show when={!isEmpty(posts())}>
      <VStack spacing="$4" alignItems="center" maxW="90%">
        <Box pos="relative" overflow="hidden" h="$sm" w="$full" minW="$sm">
          <HStack pos="absolute" spacing="$4" h="$full" w="$full" transform={`translateX(-${currentImage() * 100}%yd)`}>
            <For each={posts()}>
              {({ slug, attributes: { title, image } }) => (
                <Flex pos="relative" role="group">
                  <Image src={image.replace(BASE_URL_PLACEHOLDER, import.meta.env.VITE_BASE_IMG_URL)} />
                  <HStack
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    p="$2"
                    transition="opacity 0.2s linear"
                    opacity={0}
                    justifyContent="space-between"
                    bg={hoverColor()}
                    _groupHover={{
                      opacity: 1,
                    }}
                  >
                    <Text css={{ textOverflow: 'ellipsis' }}>{title}</Text>
                    <Button onClick={() => navigate(`/post/${slug}`)} variant="ghost" rightIcon={<FiExternalLink />}>
                      View Post
                    </Button>
                  </HStack>
                </Flex>
              )}
            </For>
          </HStack>
        </Box>
        <HStack spacing="$4">
          <Button variant="ghost" onClick={() => setCurrentImage(prevImage())}>
            Prev
          </Button>
          <Button variant="ghost" onClick={() => setCurrentImage(nextImage())}>
            Next
          </Button>
        </HStack>
      </VStack>
    </Show>
  )
}

export default Carousel
