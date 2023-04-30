import {
  Badge,
  Button,
  GridItem,
  Heading,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@hope-ui/solid'
import { For, createResource, createSignal } from 'solid-js'
import toPlainObject from 'lodash/toPlainObject'
import Image from './Image'
import { BiRegularSortUp } from 'solid-icons/bi'

const loadPosts = () =>
  Promise.all(Object.values(import.meta.glob('../Posts/*.md')).map((call) => call())).then((items) =>
    items.map(toPlainObject),
  )

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
      return posts.sort(
        (a, b) => (b.markdown.match(/png|jpg/g) || []).length - (a.markdown.match(/png|jpg/g) || []).length,
      )
    case SortType.PHOTO_ASC:
      return posts.sort(
        (a, b) => (a.markdown.match(/png|jpg/g) || []).length - (b.markdown.match(/png|jpg/g) || []).length,
      )
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
  const [posts] = createResource<any[]>(loadPosts, { initialValue: [] })
  const [sortMethod, setSortMethod] = createSignal(SortType.DATE_DESC)
  const cardColor = useColorModeValue('$blackAlpha3', '$whiteAlpha3')
  const badgeColor = useColorModeValue('$blackAlpha3', '$whiteAlpha6')
  const dateColor = useColorModeValue('$blackAlpha10', '$whiteAlpha10')

  const sort = () => humanReadableSortMap[sortMethod()]
  return (
    <VStack alignItems="start" w="$full" p="$4" spacing="$4">
      <Menu>
        <MenuTrigger as={Button} variant="subtle" colorScheme="neutral" rightIcon={<BiRegularSortUp />}>
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
                  spacing="$2"
                  w="$full"
                  h="$full"
                >
                  <Image src={post.attributes.image} />
                  <VStack alignItems="start" p="$2">
                    <Text color={dateColor()}>{post.attributes.date}</Text>
                    <Heading>{post.attributes.title}</Heading>
                    <VStack spacing="$4">
                      <Text>{post.attributes.description}</Text>
                      <SimpleGrid columns={4}>
                        <For each={post.attributes.categories}>
                          {(tag) => (
                            <GridItem>
                              <Badge bg={badgeColor()}>
                                <Text>{tag}</Text>
                              </Badge>
                            </GridItem>
                          )}
                        </For>
                      </SimpleGrid>
                    </VStack>
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

/**
 * <Markdown
                  children={post.markdown || ''}
                  components={{
                    h1: Heading as any,
                    p: Text as any,
                    img: (props: any) => <Image {...props} style={{ maxWidth: '100%' }} />,
                  }}
                />
 */
