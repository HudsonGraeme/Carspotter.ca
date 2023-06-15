import { hope, Stack, Text, useColorModeValue } from '@hope-ui/solid'
import { Link, LinkProps } from '@solidjs/router'
import { For } from 'solid-js'

interface ILink extends LinkProps {
  label: string
  isDisabled?: boolean
}

const links: ILink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Posts',
    href: '/blog',
  },
  {
    label: 'Garage',
    href: '/garage',
    isDisabled: true,
  },
]
const HopeLink = hope(Link, {
  baseStyle: {
    p: '$1',
    px: '$2',
    fontWeight: '$bold',
    rounded: '$sm',
    transition: 'background-color 0.2s ease-in-out',
  },
})

const Navigation = () => {
  const hoverColor = useColorModeValue('$blackAlpha6', '$whiteAlpha6')
  const activeColor = useColorModeValue('$blackAlpha8', '$whiteAlpha8')
  return (
    <Stack direction={{ '@initial': 'column', '@md': 'row' }} alignItems="center">
      <For each={links}>
        {({ label, href, isDisabled }, index) => (
          <>
            <HopeLink
              href={href}
              _hover={{ bgColor: hoverColor() }}
              _active={{ bgColor: activeColor() }}
              style={{ filter: isDisabled ? 'brightness(60%)' : 'none' }}
              cursor={isDisabled ? 'not-allowed' : 'pointer'}
              onClick={(e: MouseEvent) => {
                if (isDisabled) e.preventDefault()
              }}
            >
              {label}
            </HopeLink>
            {index() !== links.length - 1 && links.length > 1 ? <Text mx="$2">&#x2022;</Text> : null}
          </>
        )}
      </For>
    </Stack>
  )
}

export default Navigation
