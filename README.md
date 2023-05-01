# Carspotter.ca

This website is [Solid] AF.

## What's this

It's a custom blog site featuring posts about exotic cars built to replace an old wordpress site.

## Why is it so fast

Two main factors contribute to the speed of the app

1. Lack of backend, this is 100% frontend and CloudFlare R2
2. The use of [SolidJS] improves performance across the frontend by optimizing DOM updates

## What is it made with

On top of the open source utility libraries like lodash and date-fns, these packages are responsible for all the heavy lifting.

- [VITE] - Man, that bundler is fast
- [SolidJS] - React-style syntax without a virtual DOM + many, many cool features
- [vite-plugin-markdown] - A sweet VITE plugin that handles parsing the markdown blog posts at transpile time
- [solid-markdown] - A port of [react-markdown] to SolidJS that allows for secure and styled rendering of markdown

## Contributing

The site shouldn't ever need maintenance after it's initially created, although if you notice a typo or something like that then PRs are much appreciated :)

## GM

gm, ser!

[SolidJS]: https://solidjs.com 'SolidJS'
[VITE]: https://vitejs.dev/ 'VITE'
[vite-plugin-markdown]: https://github.com/hmsk/vite-plugin-markdown 'Markdown parser for VITE'
[solid-markdown]: https://github.com/andi23rosca/solid-markdown 'Solid renderer for markdown components'
[react-markdown]: https://github.com/remarkjs/react-markdown 'React renderer for markdown components'
