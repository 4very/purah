import * as React from 'react'

import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin'
import { JSONInput, Field, IconButton, Accordion } from '@strapi/design-system'

import { ArrowClockwise } from '@strapi/icons'

import { getFetchClient } from '@strapi/strapi/admin'
import { DesignSystemProvider } from '@strapi/design-system'

const FilterSelect = React.forwardRef((props, ref) => {
  // @ts-ignore
  const { attribute, disabled, label, name, onChange, required, value } = props

  const change = (value: any) =>
    onChange({
      target: {
        name,
        type: attribute.type,
        value: value,
      },
    })

  if (!value || value === 'null') change({ values: [] })

  const { form } = useContentManagerContext()
  const { values: modifiedData } = form
  const path = name.split('.')

  const key = path.slice(0, -1).reduce((a: any, cv: any) => a[cv], modifiedData).key

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
              if (elt in a.values) a.values[v]++
              else a.values[elt] = 1
            })

            return a
          },
          { values: {}, sum: 0 }
        )
      )
      .then((d: any) => change({ sum: d.sum, values: Object.entries(d.values) }))
  }

  return (
    <DesignSystemProvider>
      <Field.Root name="PhotoKey">
        <Field.Label>{label}</Field.Label>
        <Accordion.Root>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger>Filter Data</Accordion.Trigger>
              <Accordion.Actions>
                <IconButton label="Refresh" onClick={updateValues}>
                  <ArrowClockwise />
                </IconButton>
              </Accordion.Actions>
            </Accordion.Header>
            <Accordion.Content>
              <JSONInput
                disabled={disabled}
                value={typeof value === 'object' ? JSON.stringify(value, undefined, 4) : value}
                ref={ref}
                onChange={change}
              />
              <Field.Error />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </Field.Root>
    </DesignSystemProvider>
  )
})

export default FilterSelect
