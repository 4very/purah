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
            $or: [
              {
                iso: {
                  $contains: 'value',
                },
              },
            ],
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
            $or: [
              {
                shutter_speed: {
                  $contains: 'value',
                },
              },
            ],
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
            $or: [
              {
                iso: {
                  $contains: 'value',
                },
              },
            ],
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
            $or: [
              {
                title: {
                  $contains: 'value',
                },
              },
            ],
          },
        ],
      },
    },
  ],
]

export const ERRORS: [string, string][] = [
  ['key:value', EvaluateError.InvalidKey],
]
