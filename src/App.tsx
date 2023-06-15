import '@fontsource/fira-code/700.css'
import { HopeProvider } from '@hope-ui/solid'
import { Route, Router, Routes } from '@solidjs/router'
import Layout from './Components/Layout'
import About from './Pages/About'
import Blog from './Pages/Blog'
import BlogPost from './Pages/BlogPost'
import Home from './Pages/Home'
import './styles.css'

function App() {
  return (
    <HopeProvider
      config={{
        initialColorMode: 'system',
        lightTheme: {
          colors: {
            text: '$black',
            inverted: '$white',
            purple: '#6f68fc',
          },
        },
        darkTheme: {
          colors: {
            text: '$white',
            inverted: '$black',
            purple: '#7c66dc',
          },
        },
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
            <Route path="/post/:slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </Router>
    </HopeProvider>
  )
}
export default App
