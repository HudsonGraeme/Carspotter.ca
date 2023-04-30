import { Heading, Text, VStack } from '@hope-ui/solid'
import PostGrid from '../Components/PostGrid'
import TwoUp from '../Components/TwoUp'

const Blog = () => (
  <VStack alignItems="start" p="$16" spacing="$16">
    <TwoUp
      first={<Heading>Welcome to the Blog</Heading>}
      second={
        <Text maxW="$lg">
          Our blog is a haven for car enthusiasts, photography aficionados, and anyone who appreciates the finer things
          in life. We have meticulously curated a collection of mesmerizing images that showcase the artistry,
          craftsmanship, and allure of exotic automobiles. Each photograph captures the essence of these remarkable
          machines, allowing you to revel in their magnificence from the comfort of your screen.
        </Text>
      }
    />

    <PostGrid />
  </VStack>
)

export default Blog
