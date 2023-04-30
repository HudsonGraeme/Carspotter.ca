import { HopeProvider } from '@hope-ui/solid'
import Home from './Pages/Home'
import { Route, Router, Routes } from '@solidjs/router'
import Layout from './Components/Layout'
import '@fontsource/fira-code/700.css'
import About from './Pages/About'
import Blog from './Pages/Blog'

function App() {
  return (
    <HopeProvider
      config={{
        initialColorMode: 'system',
        components: {
          Heading: {
            baseStyle: {
              fontFamily: `'Fira Code', monospace`,
            },
          },
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
          </Route>
        </Routes>
      </Router>
    </HopeProvider>
  )
}
export default App
