export const toDataURL = async (url: string) => {
  const blob = await fetch(url).then((res) => res.blob())
  return URL.createObjectURL(blob)
}
