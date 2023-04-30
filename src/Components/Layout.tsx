import { Outlet } from '@solidjs/router'
import Header from './Header'
import Footer from './Footer'
import { VStack } from '@hope-ui/solid'

const Layout = () => {
  return (
    <VStack minH="100vh" w="$full" h="$full" justifyContent="space-between">
      <Header />
      <Outlet />
      <Footer />
    </VStack>
  )
}
export default Layout
