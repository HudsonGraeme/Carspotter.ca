import {
  Button,
  GridItem,
  Heading,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@hope-ui/solid'
import { useNavigate } from '@solidjs/router'
import { BiRegularSortUp } from 'solid-icons/bi'
import { createSignal, For } from 'solid-js'
import usePosts from '../Hooks/usePosts'
import { BASE_URL_PLACEHOLDER } from '../utilities/constants'
import Image from './Image'

enum SortType {
  DATE_DESC,
  DATE_ASC,
  PHOTO_DESC,
  PHOTO_ASC,
}

const sortPosts = (posts: any[], sortType: SortType) => {
  switch (sortType) {
    case SortType.DATE_DESC:
      return posts.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime())
    case SortType.DATE_ASC:
      return posts.sort((a, b) => new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime())
    case SortType.PHOTO_DESC:
      return posts.sort((a, b) => (b.markdown.match(/avif/g) || []).length - (a.markdown.match(/avif/g) || []).length)
    case SortType.PHOTO_ASC:
      return posts.sort((a, b) => (a.markdown.match(/avif/g) || []).length - (b.markdown.match(/avif/g) || []).length)
    default:
      return posts
  }
}

const humanReadableSortMap = {
  [SortType.DATE_DESC]: {
    type: 'Date',
    order: 'Descending',
  },
  [SortType.DATE_ASC]: {
    type: 'Date',
    order: 'Ascending',
  },
  [SortType.PHOTO_DESC]: {
    type: 'Number of Photos',
    order: 'Descending',
  },
  [SortType.PHOTO_ASC]: {
    type: 'Number of Photos',
    order: 'Ascending',
  },
}

const PostGrid = () => {
  const posts = usePosts()
  const [sortMethod, setSortMethod] = createSignal(SortType.DATE_DESC)
  const cardColor = useColorModeValue('$blackAlpha3', '$whiteAlpha3')
  const iconColor = useColorModeValue('black', 'white')
  const dateColor = useColorModeValue('$blackAlpha10', '$whiteAlpha10')
  const navigate = useNavigate()

  const sort = () => humanReadableSortMap[sortMethod()]
  return (
    <VStack alignItems="start" w="$full" p="$4" spacing="$4">
      <Menu>
        <MenuTrigger
          as={Button}
          variant="subtle"
          colorScheme="neutral"
          rightIcon={<BiRegularSortUp fill={iconColor()} />}
        >
          <Text>
            Sort by{' '}
            <Text as="span" color="$info11">
              {sort().type}{' '}
            </Text>{' '}
            in{' '}
            <Text as="span" color="$info11">
              {sort().order}
            </Text>{' '}
            Order
          </Text>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={() => setSortMethod(SortType.DATE_DESC)}>Date (Desc)</MenuItem>
          <MenuItem onSelect={() => setSortMethod(SortType.DATE_ASC)}>Date (Asc)</MenuItem>
          <MenuItem onSelect={() => setSortMethod(SortType.PHOTO_DESC)}>Number of Photos (Desc)</MenuItem>
          <MenuItem onSelect={() => setSortMethod(SortType.PHOTO_ASC)}>Number of Photos (Asc)</MenuItem>
        </MenuContent>
      </Menu>
      <SimpleGrid columns={{ '@initial': 1, '@md': 2, '@xl': 4 }} gap="$2">
        <For each={sortPosts(posts(), sortMethod())}>
          {(post) => {
            return (
              <GridItem>
                <VStack
                  bgColor={cardColor()}
                  rounded="$lg"
                  overflow="hidden"
                  alignItems="start"
                  w="$full"
                  spacing="$0"
                  h="$full"
                  maxH="$sm"
                  cursor="pointer"
                  onClick={() => navigate(`/post/${post.slug}`)}
                >
                  <Image
                    maxH="$72"
                    maxW="$full"
                    src={(post.attributes.image || '').replace(BASE_URL_PLACEHOLDER, import.meta.env.VITE_BASE_IMG_URL)}
                  />
                  <VStack alignItems="start" p="$4">
                    <Text color={dateColor()}>{post.attributes.date}</Text>
                    <Heading>{post.attributes.title}</Heading>
                  </VStack>
                </VStack>
              </GridItem>
            )
          }}
        </For>
      </SimpleGrid>
    </VStack>
  )
}

export default PostGrid
