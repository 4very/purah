import type { Context } from 'koa'

type EBirdResponse = {
  sciName: string
  comName: string
  speciesCode: string
  category: string
  taxonOrder: number
  bandingCodes: string[]
  comNameCodes: string[]
  sciNameCodes: string[]
  order: string
  familyCode: string
  familyComName: string
  familySciName: string
}

async function fetchEBird(url: string): Promise<Response> {
  return fetch(url, {
    method: 'GET',
    headers: {
      'x-ebirdapitoken': 'qg01k6sicorh',
      'User-Agent': 'insomnia/9.2.0',
    },
  })
}

async function getBirdFromEbird(speciesCode: string): Promise<EBirdResponse> {
  const url = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=${speciesCode}`
  return fetchEBird(url)
    .then((r) => r.json())
    .then((d) => d[0]) as Promise<EBirdResponse>
}

async function getBirdsFromEbird(
  speciesCodes: string[]
): Promise<EBirdResponse[]> {
  const url = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&${speciesCodes
    .map((i) => 'species=' + i)
    .join('&')}`
  const r = fetchEBird(url)
  return r.then((r) => r.json()) as Promise<EBirdResponse[]>
}

async function getBirdsFromRegion(region: string): Promise<string[]> {
  const url = `https://api.ebird.org/v2/product/spplist/${region}`
  return fetchEBird(url).then((r) => r.json()) as Promise<string[]>
}

async function updateAndFetchBird(speciesCode: string) {
  const data = await getBirdFromEbird(speciesCode)
  console.log(data)
  if (!data) return false
  updateBird(data)
  return data
}

async function updateBird(data: EBirdResponse) {
  const res = await strapi.documents('api::bird.bird').findMany({
    filters: { speciesCode: data.speciesCode },
  })

  if (res.length === 0) strapi.documents('api::bird.bird').create({ data })
  else
    strapi.documents('api::bird.bird').update({
      documentId: res[0].documentId,
      data,
    })

  return data
}

async function chunkFetch(
  codes: string[],
  func: { (birds: EBirdResponse): Promise<void> }
) {
  const chunkSize = 100
  for (let i = 0; i < codes.length; i += chunkSize) {
    const chunk = codes.slice(i, i + chunkSize)
    const birds = await getBirdsFromEbird(chunk)
    birds.forEach((bird) => func(bird))
  }
}

async function updateBirds(codes: string[]) {
  const promises = []
  chunkFetch(codes, async (bird) => {
    promises.push(updateBird(bird))
  })
  await Promise.all(promises)
  console.log('Updated', codes.length, 'birds.')
}

export default {
  async region(ctx) {
    if (!ctx.params.region) {
      ctx.response.status = 400
      return
    }
    const codes = await getBirdsFromRegion(ctx.params.region as string)
    await updateBirds(codes)
    ctx.response.status = 200
  },
  async all(ctx: Context) {
    const codes = await strapi
      .documents('api::bird.bird')
      .findMany({
        fields: ['speciesCode'],
      })
      .then((d) => d.map((b) => b.speciesCode))

    await updateBirds(codes)
    ctx.response.status = 200
  },
  async bird(ctx) {
    if (
      ctx.params.bird &&
      (await updateAndFetchBird(ctx.params.bird as string))
    ) {
      ctx.response.status = 200
    } else {
      ctx.response.status = 400
    }
  },
}
