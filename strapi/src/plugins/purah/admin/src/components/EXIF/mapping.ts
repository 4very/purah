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
  ['shutter_speed', 'ExposureTime', 'decimal'],
  ['focal_length', 'FocalLength', 'number'],
  ['camera_body', 'Model', 'string'],
  ['camera_lens', 'LensModel', 'string'],
  ['mode', 'ExposureProgram', 'string'],
  ['last_modified', 'ModifyDate', 'datetime'],
  ['metering_mode', 'MeteringMode', 'string'],
]

export default mapping
