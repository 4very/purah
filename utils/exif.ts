import type { Strapi4ResponseSingle } from '@nuxtjs/strapi'
import { parse } from 'exifr'
import type { Photo } from '~/strapi/src/types/api/photo'

type EXIF = { [key: string]: any }

export async function getEXIFPhoto(
  data: Strapi4ResponseSingle<Photo['attributes']>,
  strapi_url: string | undefined = undefined
): ReturnType<typeof getEXIF> {
  const runtimeConfig = useRuntimeConfig()
  return getEXIF(
    `${strapi_url ?? runtimeConfig.public.strapi.url}${
      data.data.attributes.photo.data.attributes.url
    }`
  )
}

export async function getEXIF(data: string): Promise<EXIF> {
  return parse(data)
}
