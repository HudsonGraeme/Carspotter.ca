import {
  Box,
  Button,
  Container,
  GridItem,
  GridItemProps,
  Heading,
  HeadingProps,
  ListProps,
  SimpleGrid,
  Text,
  VStack,
} from '@hope-ui/solid'
import { Link, useParams } from '@solidjs/router'
import isEmpty from 'lodash/isEmpty'
import { FiArrowLeft } from 'solid-icons/fi'
import { Show } from 'solid-js'
import Markdown from 'solid-markdown'
import Image from '../Components/Image'
import usePosts from '../Hooks/usePosts'
import { BASE_URL_PLACEHOLDER } from '../utilities/constants'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const posts = usePosts()
  const post = () => posts().find((postItem) => postItem.slug === slug)
  return (
    <VStack alignItems="start" spacing="$6" my={12}>
      <Button as={Link} href="/blog" variant="subtle" colorScheme="neutral" leftIcon={<FiArrowLeft />}>
        Back
      </Button>
      <Show when={!isEmpty(post())}>
        <Container bg="$blackAlpha4" maxW="$containerLg">
          <Markdown
            components={{
              h1: ({ level, ...props }) => (
                <Heading p={18} level={level as HeadingProps['level']} {...props} fontSize="$2xl" />
              ),
              h2: ({ level, ...props }) => (
                <Heading p={18} level={level as HeadingProps['level']} {...props} fontSize="$xl" />
              ),
              ul: (props) => <SimpleGrid {...(props as unknown as ListProps)} maxH="$sm" />,
              li: (props) => <GridItem {...(props as unknown as GridItemProps)} />,
              p: (props) => (
                <Box
                  p={16}
                  m={8}
                  display="inline-flex"
                  bg={typeof props.children[0] === 'string' ? '$blackAlpha4' : null}
                >
                  {typeof props.children[0] === 'string' ? <Text {...props} /> : <Box {...props} />}
                </Box>
              ),
              img: (props) =>
                /mp4|mov|m4v/.test(props.src) ? (
                  <video
                    controls
                    {...(props as unknown as any)}
                    src={props.src.replace(BASE_URL_PLACEHOLDER, import.meta.env.VITE_BASE_IMG_URL)}
                  />
                ) : (
                  <Image
                    cursor="zoom-in"
                    maxW="$md"
                    objectFit="contain"
                    {...props}
                    src={props.src.replace(BASE_URL_PLACEHOLDER, import.meta.env.VITE_BASE_IMG_URL)}
                  />
                ),
            }}
            children={post().markdown}
          />
        </Container>
      </Show>
    </VStack>
  )
}

export default BlogPost
