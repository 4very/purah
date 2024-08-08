const config = useRuntimeConfig()
import type { Photo } from '~/strapi/src/types/api/photo'
import qs from 'qs'

export interface Strapi4ResponseMany<T> {
  data: {
    id: number
    attributes: T
    meta: Record<string, unknown>
  }[]
  meta: {
    pagination:
      | {
          page: number
          pageSize: number
          pageCount: number
          total: number
        }
      | {
          start: number
          limit: number
          total: number
        }
    [key: string]: unknown
  }
}

export async function getPhotos<T>(r: any): Promise<Strapi4ResponseMany<T>> {
  return await $fetch(
    `${config.strapi.url}/api/photos?${qs.stringify(r, {
      encodeValuesOnly: true, // prettify URL
    })}`
  )
}
