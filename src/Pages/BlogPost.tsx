import { useParams } from '@solidjs/router'
import Markdown from 'solid-markdown'
import usePosts from '../Hooks/usePosts'
import { Show } from 'solid-js'
import { Heading, HeadingProps, Text } from '@hope-ui/solid'
import Image from '../Components/Image'

const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const posts = usePosts()
  const post = () => posts().find((post) => post.attributes.slug === id)
  return (
    <Show when={!!post()}>
      <Markdown
        components={{
          h1: ({ level, ...props }) => <Heading level={level as HeadingProps['level']} {...props} />,
          p: (props) => <Text {...props} />,
          img: (props) => <Image {...props} />,
        }}
        children={post().markdown}
      />
    </Show>
  )
}

export default BlogPost
