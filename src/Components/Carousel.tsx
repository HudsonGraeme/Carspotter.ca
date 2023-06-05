import { Box, Flex, HStack, Text, useColorModeValue } from '@hope-ui/solid'
import { useNavigate } from '@solidjs/router'
import isEmpty from 'lodash/isEmpty'
import { FiExternalLink } from 'solid-icons/fi'
import { For, Show } from 'solid-js'
import { Swiper, SwiperSlide } from 'swiper/solid'
import 'swiper/swiper-bundle.css'
import { BASE_URL_PLACEHOLDER } from '../utilities/constants'
import Button from './Button'

const Carousel = ({ posts }) => {
  const hoverColor = useColorModeValue('$whiteAlpha11', '$blackAlpha11')
  const navigate = useNavigate()

  return (
    <Show when={!isEmpty(posts())}>
      <Flex
        w="$sm"
        minH="$xs"
        bg="#edf3f8"
        _dark={{
          bg: '#3e3e3e',
        }}
        p={10}
        alignItems="center"
        justifyContent="center"
      >
        <Swiper style={{ width: '100%', flex: 1, height: '100%' }}>
          <For each={posts()}>
            {({ slug, attributes: { title, image } }) => (
              <SwiperSlide>
                <Box
                  boxSize="full"
                  shadow="md"
                  w="$full"
                  h="$full"
                  background={`url(${image.replace(BASE_URL_PLACEHOLDER, import.meta.env.VITE_BASE_IMG_URL)})`}
                  style={{ 'background-size': 'cover', 'background-repeat': 'no-repeat' }}
                  role="group"
                  alignItems="end"
                  justifyItems="center"
                  display="flex"
                >
                  <HStack
                    w="$full"
                    position="relative"
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
                </Box>
              </SwiperSlide>
            )}
          </For>
        </Swiper>
      </Flex>
    </Show>
  )
}

export default Carousel
