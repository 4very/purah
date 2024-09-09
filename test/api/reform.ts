export const TESTS: [string, any][] = [
  ['ISO:400', { iso: ['400'] }],
  ['ISO:400 title', { iso: ['400'], title: ['title'] }],
  ['ISO:400:500', { iso: ['500', '400'] }],
  ['ISO:400:500:600', { iso: ['600', '500', '400'] }],
]
