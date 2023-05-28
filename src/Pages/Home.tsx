import { Heading, Text, VStack } from '@hope-ui/solid'
import TwoUp from '../Components/TwoUp'
import Carousel from '../Components/Carousel'
import usePosts from '../Hooks/usePosts'
import sampleSize from 'lodash/sampleSize'

const Home = () => {
  const posts = usePosts()

  return (
    <VStack spacing="$24" p="$16" w="$full" h="$full" flex="1" alignItems="start">
      <TwoUp
        first={<Heading>Home</Heading>}
        second={
          <Text maxW="$lg">
            This website is a tribute to all those who have supported and believed in my passion for cars and
            photography. It is my hope that you, the visitor, will not only enjoy the aesthetically pleasing content but
            also feel a sense of inspiration and wonder as you delve into the world of exotic cars through my lens. So,
            sit back, buckle up, and prepare to be captivated. Let the carousel of photos take you on a visual odyssey,
            while the accompanying content brings you closer to the stories, the moments, and the sheer magnificence of
            these exceptional automobiles.
          </Text>
        }
      />
      <TwoUp
        first={
          <Heading>
            Popular <br />
            Shots
          </Heading>
        }
        second={<Carousel posts={() => sampleSize(posts(), 3)} />}
      />
    </VStack>
  )
}

export default Home
