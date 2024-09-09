import type { GalleryView } from '~/strapi/src/types/api/gallery-view'

export async function getGallery() {
  const { findOne } = useStrapi<GalleryView['attributes']>()

  return findOne('gallery-view', {
    populate: {
      filters: '*',
      photos: {
        populate: ['photo'],
      },
    },
  })
}
