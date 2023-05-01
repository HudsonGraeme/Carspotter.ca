import { createResource } from 'solid-js'
import toPlainObject from 'lodash/toPlainObject'

const loadPosts = () =>
  Promise.all(
    Object.entries(import.meta.glob('../Posts/*.md')).map(([path, call]) =>
      call().then((data) => ({
        path,
        slug: path.split('/')[path.split('/').length - 1].split('.md')[0],
        ...toPlainObject(data),
      })),
    ),
  )

const usePosts = () => {
  const [posts] = createResource<any[]>(loadPosts, { initialValue: [] })
  return posts
}

export default usePosts
