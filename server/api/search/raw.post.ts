import { getPhotos } from '../../util/useStrapi'
export default defineEventHandler<{ body: any }>(async (event) => {
  const body = await readBody(event)
  return getPhotos(body)
})
