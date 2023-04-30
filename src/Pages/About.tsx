import { Heading, Text } from '@hope-ui/solid'
import TwoUp from '../Components/TwoUp'

const About = () => (
  <TwoUp
    first={<Heading>About</Heading>}
    second={
      <Text maxW="$xl">
        From 2012 to 2019, I had a great interest in exotic cars and captured numerous photos of them. Although I still
        have a fondness for cars, I've since pursued other interests until I'm able to rejoin the exotic car community
        as an owner. On this website, you'll find all the blog posts I wrote during my time carspotting, along with the
        images I took. I hope you enjoy this content and find it aesthetically pleasing. <br />
        <br />
        I'd also like to express my gratitude to some important individuals who supported my passion for cars. Firstly,
        Carol and Rob from the Ferrari Club of America were exceptionally kind to let me participate in various club
        meetups and even feature some of my photos in the official FCA magazine. Additionally, Ramtin and Teamledin
        always encouraged my love for cars and photography, and I'm immensely thankful for that. Both of them are
        remarkable individuals who provided me with opportunities to photograph some amazing vehicles while being great
        conversationalists.
      </Text>
    }
  />
)

export default About
