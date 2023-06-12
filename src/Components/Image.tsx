import {
  Button,
  Flex,
  Heading,
  HStack,
  Image as HopeImage,
  ImageProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@hope-ui/solid'
import { format } from 'date-fns'
import exifr from 'exifr'
import { get, isEmpty, isNil, omitBy } from 'lodash'
import { FiDownload } from 'solid-icons/fi'
import { createEffect, createSignal, For, Show } from 'solid-js'
import { toDataURL } from '../utilities'
import Crash from './Asset/crash'
import Loading from './Asset/Loading'
const Image = ({ src, alt, ...otherProps }: ImageProps) => {
  const [loaded, setLoaded] = createSignal(false)
  const [error, setError] = createSignal(false)
  const [modalOpen, setModalOpen] = createSignal(false)
  const [exifData, setExifData] = createSignal(null)
  const [dataURL, setDataURL] = createSignal(null)
  const [fullSizeDataURL, setFullSizeDataURL] = createSignal(null)
  const [largeImageLoaded, setLargeImageLoaded] = createSignal(false)
  const errorTextColor = useColorModeValue('$blackAlpha10', '$whiteAlpha10')
  const loadingFillColor = useColorModeValue('$blackAlpha7', '$whiteAlpha7')
  const noImageBackgroundColor = useColorModeValue('$whiteAlpha10', '$blackAlpha10')

  createEffect(() => {
    if (src && !dataURL()) {
      toDataURL(src).then((dataUrl) => setDataURL(dataUrl))
    }
  })

  createEffect(() => {
    if (src && !fullSizeDataURL() && modalOpen()) {
      toDataURL(src.replace('/optimized', '').replace('avif', 'jpg')).then((url) => setFullSizeDataURL(url))
    }
  })

  createEffect(() => {
    if (dataURL()) {
      exifr.parse(dataURL()).then((exif) => {
        const exifData = {
          Camera: get(exif, 'Model'),
          Orientation: get(exif, 'Orientation'),
          'Exposure Time': get(exif, 'ExposureTime'),
          'F-Stop': get(exif, 'FNumber'),
          ISO: get(exif, 'ISO'),
          'Date Taken': format(new Date(get(exif, 'CreateDate')), `MMM do',' yyyy 'at' h:m aaaa`),
          'Max Aperture': get(exif, 'MaxApertureValue'),
          'Flash Mode': get(exif, 'Flash'),
          'Focal Length': get(exif, 'FocalLength'),
          Width: get(exif, 'ExifImageWidth'),
          Height: get(exif, 'ExifImageHeight'),
        }
        setExifData(omitBy(exifData, isNil))
      })
    }
  })

  return (
    <>
      <Modal opened={modalOpen()} onClose={() => setModalOpen(false)} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as={HStack} justifyContent="space-between">
            <Heading>{alt}</Heading>
            <ModalCloseButton bg="#131313" pos="relative" />
          </ModalHeader>
          <ModalBody>
            <Show when={!largeImageLoaded()}>
              <Skeleton w="6000px" h="4000px" maxW="$full" maxH="80vh" />
            </Show>
            <Flex w="$full" h="$full">
              <HopeImage
                src={fullSizeDataURL()}
                onLoad={() => setLargeImageLoaded(true)}
                w="$full"
                h="$full"
                objectFit="contain"
                maxH="80vh"
                flex={1}
              />
            </Flex>
            <VStack p={6} pt={16} alignItems="start">
              <HStack w="$full" justifyContent="space-between">
                <Heading fontWeight="bold" fontSize="$2xl">
                  Image Details
                </Heading>
                <Button
                  as="a"
                  bg="$accent10"
                  _hover={{ bg: '$accent10' }}
                  rightIcon={<FiDownload />}
                  href={fullSizeDataURL()}
                  download="test"
                >
                  Download
                </Button>
              </HStack>
              <Show when={!isEmpty(exifData())}>
                <Table>
                  <Thead>
                    <Tr bg="$accent10">
                      <Th>Name</Th>
                      <Th numeric>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <For each={Object.entries(exifData())}>
                      {([key, value]: [string, string], index) => (
                        <Tr bg="#131313">
                          <Td>{key}</Td>
                          <Td numeric>{value}</Td>
                        </Tr>
                      )}
                    </For>
                  </Tbody>
                </Table>
              </Show>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Show when={!error()}>
        <HopeImage
          src={dataURL()}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          transition="opacity 0.5s ease-out"
          opacity={loaded() ? 1 : 0}
          onClick={() => setModalOpen(true)}
          {...otherProps}
        />
      </Show>
      <Show when={!loaded() && !error() && src}>
        <VStack
          minW="$sm"
          w="$full"
          h="$xs"
          bg={noImageBackgroundColor()}
          justifyContent="center"
          color={errorTextColor()}
          spacing="$4"
          p={4}
          {...otherProps}
        >
          <Loading w="$12" h="$12" css={{ fill: loadingFillColor() }} />
          <Text fontSize="$xs">Finding car...</Text>
        </VStack>
      </Show>
      <Show when={error() || !src}>
        <VStack
          minW="$sm"
          w="$full"
          h="$xs"
          bg={noImageBackgroundColor()}
          justifyContent="center"
          color={errorTextColor()}
          p={4}
          {...otherProps}
        >
          <Crash w="$12" h="$12" css={{ fill: errorTextColor() }} />
          <Text fontSize="$xs">Crashed while trying to deliver image...</Text>
        </VStack>
      </Show>
    </>
  )
}

export default Image
