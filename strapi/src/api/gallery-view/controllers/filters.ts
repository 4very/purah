import { GalleryView_Plain } from '../../../types/api/gallery-view'

type FilterData = {
  count: number
  items: FilterItem[]
}

type FilterItem = {
  raw_value: string
  formatted_value?: string
  count: number
}

type Photo = GalleryView_Plain['photos'][number]
type Filter = GalleryView_Plain['filters'][number]

const INCLUDE_NONE: boolean = false

const KEY_TRANSFORMS: {
  [key: string]: { (key: string, photo: Photo): string | string[] }
} = {
  collections: (key, photo) =>
    photo.collections.length > 0
      ? photo.collections.map((c) => c.title)
      : 'None',
  birds: (key, photo) =>
    //@ts-ignore
    photo.birds.length > 0 ? photo.birds.map((bird) => bird.comName) : 'None',
  DEFAULT: (key, photo) => photo[key] ?? 'None',
}

function transform_key(key: string, photo: Photo): string[] | string {
  if (key in KEY_TRANSFORMS) return KEY_TRANSFORMS[key](key, photo)
  else return KEY_TRANSFORMS.DEFAULT(key, photo)
}

async function getGalleryView(): Promise<GalleryView_Plain> {
  //@ts-ignore
  return strapi.documents('api::gallery-view.gallery-view').findFirst({
    //@ts-ignore
    populate: {
      filters: '*',
      photos: { populate: ['birds', 'collections'] },
    },
  }) as Promise<GalleryView_Plain>
}

async function updateFilter(filter: Filter, photos: Photo[]): Promise<Filter> {
  const { key } = filter
  const items = Object.values(
    photos.reduce((prev, cur) => {
      const values = transform_key(key, cur)
      if (!INCLUDE_NONE && values === 'None') return prev
      const inc = (value) =>
        value in prev
          ? prev[value].count++
          : (prev[value] = {
              raw_value: typeof value === 'number' ? value.toString() : value,
              count: 1,
            })

      if (Array.isArray(values)) values.forEach(inc)
      else inc(values)

      return prev
    }, {} as { [key: string]: FilterItem })
  )

  const filter_data: FilterData = {
    count: items.reduce((prev, cur) => (prev += cur.count), 0),
    items,
  }

  return {
    ...filter,
    filters: JSON.parse(JSON.stringify(filter_data)),
  }
}

async function setFilters(documentId: string, filters: Filter[]) {
  await strapi.documents('api::gallery-view.gallery-view').update({
    documentId,
    populate: ['filters'],
    data: {
      //@ts-ignore
      filters,
    },
  })
}

export default {
  async update(ctx) {
    const { documentId, filters, photos } = await getGalleryView()
    const newFilters = filters.map((filter, i) => updateFilter(filter, photos))

    await Promise.all(newFilters)
      .then((filters) => setFilters(documentId, filters))
      .then(() => (ctx.body = 'OK'))
  },
}
