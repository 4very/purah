const mapping: [
  string,
  string | ((data: { [key: string]: any }) => number | string),
  string
][] = [
  ['iso', 'ISO', 'number'],
  ['aperture', 'FNumber', 'number'],
  [
    'shutter_speed',
    ({ ExposureTime: s }) => (s > 1 ? `1/${1 / s}` : `${s}"`),
    'string',
  ],
  ['taken', 'CreateDate', 'datetime'],
]

export default mapping
