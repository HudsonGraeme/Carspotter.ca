import { ButtonProps, Button as HopeButton, useColorModeValue } from '@hope-ui/solid'
const Button = (props: ButtonProps) => {
  const ghostBg = useColorModeValue('$blackAlpha3', '$whiteAlpha3')
  const ghostColor = useColorModeValue('black', 'white')
  let styleProps: ButtonProps = {}
  if (props.variant === 'ghost') {
    styleProps = {
      bg: ghostBg(),
      color: ghostColor(),
      _hover: {
        bg: ghostBg().replace('3', '5'),
      },
      _focus: {
        bg: ghostBg().replace('3', '7'),
        boxShadow: 'none',
      },
    }
  }
  return (
    <HopeButton {...props} {...styleProps}>
      {props.children}
    </HopeButton>
  )
}

export default Button
