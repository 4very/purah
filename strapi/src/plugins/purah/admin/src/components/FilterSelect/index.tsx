import * as React from 'react'

import { useIntl } from 'react-intl'
import { useCMEditViewDataManager, getFetchClient } from '@strapi/helper-plugin'
import {
  JSONInput,
  FieldLabel,
  Field,
  IconButton,
  FieldError,
} from '@strapi/design-system'

import { Spark } from '@strapi/icons'

const FilterSelect = React.forwardRef((props, ref) => {
  // @ts-ignore
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props // these are just some of the props passed by the content-manager
  const { formatMessage } = useIntl()

  const change = (value: any) =>
    onChange({
      target: {
        name,
        type: attribute.type,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
      },
    })

  if (!value || value === 'null') change({ values: [] })

  const { modifiedData, ...rest } = useCMEditViewDataManager()
  const path = name.split('.')
  const key = path
    .slice(0, -1)
    .reduce((a: any, cv: any) => a[cv], modifiedData).key

  const { get } = getFetchClient()

  const updateValues = () => {
    get(`/content-manager/collection-types/api::photo.photo?populate=*`)
      .then((r: any) => r.data.results.map((d: any) => d[key]))
      .then((d: any[]) =>
        d.reduce(
          (a, cv) => {
            let val
            if (key === 'collections') val = cv.map((v: any) => v.title)
            else val = [cv]

            val.forEach((v: any) => {
              a.sum++
              const elt = String(v ?? 'None')
              if (v in a.values) a.values[v]++
              else a.values[v] = 1
            })

            return a
          },
          { values: {}, sum: 0 }
        )
      )
      .then((d: any) =>
        change({ sum: d.sum, values: Object.entries(d.values) })
      )
  }

  return (
    <Field name="PhotoKey">
      <FieldLabel>{formatMessage(intlLabel)} </FieldLabel>
      <FieldError />
      <JSONInput
        disabled={disabled}
        value={value}
        ref={ref}
      />
      <IconButton
        label="Refresh"
        size="L"
        variant="secondary"
        onClick={updateValues}
      >
        <Spark />
      </IconButton>
    </Field>
  )
})

export default FilterSelect
