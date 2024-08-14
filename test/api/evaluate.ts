import { EvaluateError } from '~/server/types/evaluate'

export const TESTS: [string, any][] = [
  [
    'value',
    {
      filters: {
        $and: [
          {
            title: {
              $contains: 'value',
            },
          },
        ],
      },
    },
  ],
  [
    'iso:value',
    {
      filters: {
        $and: [
          {
            iso: {
              $contains: 'value',
            },
          },
        ],
      },
    },
  ],
  [
    'iso:value1:value2',
    {
      filters: {
        $and: [
          {
            $or: [
              {
                iso: {
                  $contains: 'value1',
                },
              },
              {
                iso: {
                  $contains: 'value2',
                },
              },
            ],
          },
        ],
      },
    },
  ],
  [
    'iso:value1:value2:value3:value4',
    {
      filters: {
        $and: [
          {
            $or: [
              {
                iso: {
                  $contains: 'value1',
                },
              },
              {
                iso: {
                  $contains: 'value2',
                },
              },
              {
                iso: {
                  $contains: 'value3',
                },
              },
              {
                iso: {
                  $contains: 'value4',
                },
              },
            ],
          },
        ],
      },
    },
  ],
  [
    '(shutter speed):value',
    {
      filters: {
        $and: [
          {
            shutter_speed: {
              $contains: 'value',
            },
          },
        ],
      },
    },
  ],
  [
    'ISO:value',
    {
      filters: {
        $and: [
          {
            iso: {
              $contains: 'value',
            },
          },
        ],
      },
    },
  ],
  [
    't:value',
    {
      filters: {
        $and: [
          {
            title: {
              $contains: 'value',
            },
          },
        ],
      },
    },
  ],
  [
    'iso:',
    {
      filters: {
        $and: [
          {
            iso: {
              $notNull: true,
            },
          },
        ],
      },
    },
  ],
  [
    'collection:value',
    {
      filters: {
        $and: [
          {
            collections: {
              title: {
                $contains: 'value',
              },
            },
          },
        ],
      },
    },
  ],
  [
    'collection:',
    {
      filters: {
        $and: [
          {
            collections: {
              title: {
                $notNull: true,
              },
            },
          },
        ],
      },
    },
  ],
]

export const ERRORS: [string, string][] = [
  ['key:value', EvaluateError.InvalidKey],
]
