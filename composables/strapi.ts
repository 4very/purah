import type { GalleryView_Plain } from '~/strapi/src/types/api/gallery-view'

export async function getGallery() {
  const { findOne } = useStrapi<GalleryView_Plain>()

  return findOne('gallery-view', {
    populate: {
      filters: '*',
      photos: {
        populate: ['photo'],
      },
    },
  })
}
