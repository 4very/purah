import { getPhotos } from '../../util/useStrapi'
export default defineEventHandler<{ query: { q: string } }>(async (event) => {
  const r = await $fetch('/api/evaluate', { query: getQuery(event) })
  return (await getPhotos(r)).meta.pagination.total
})
