import { Box, Flex, HStack, ImageProps, Stack, Text, VStack, useColorModeValue } from '@hope-ui/solid'
import { LinkProps, useNavigate } from '@solidjs/router'
import { For, createSignal } from 'solid-js'
import Image from './Image'
import Button from './Button'
import { FiExternalLink } from 'solid-icons/fi'

export interface IImageSrcWithLink extends ImageProps {
  href: LinkProps['href']
  label: string
}

interface ICarouselProps {
  sourceList: IImageSrcWithLink[]
}

const Carousel = ({ sourceList }: ICarouselProps) => {
  const [currentImage, setCurrentImage] = createSignal(0)
  const hoverColor = useColorModeValue('$whiteAlpha11', '$blackAlpha11')
  const navigate = useNavigate()
  const nextImage = () => {
    if (currentImage() + 1 < sourceList.length) {
      return currentImage() + 1
    }
    return 0
  }

  const prevImage = () => {
    if (currentImage() - 1 >= 0) {
      return currentImage() - 1
    }
    return sourceList.length - 1
  }

  return (
    <VStack spacing="$4" alignItems="center" maxW="90%">
      <Box pos="relative" overflow="hidden" h="$sm" w="$md">
        <HStack
          pos="absolute"
          spacing="$4"
          h="$full"
          w={`calc(calc(${sourceList.length} * $md) - calc(${currentImage()} * $4))`}
          transform={`translateX(calc(${currentImage()} * calc(-100% / ${sourceList.length})))`}
        >
          <For each={sourceList}>
            {({ href, ...others }) => (
              <Flex pos="relative" role="group">
                <Image {...others} />
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
                  <Text css={{ textOverflow: 'ellipsis' }}>{sourceList[currentImage()].label}</Text>
                  <Button onClick={() => navigate(href)} variant="ghost" rightIcon={<FiExternalLink />}>
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
  )
}

export default Carousel
