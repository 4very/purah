import * as React from 'react'

import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin'
import { JSONInput, Field, IconButton, Accordion } from '@strapi/design-system'
import { ArrowClockwise } from '@strapi/icons'
import { parse } from 'exifr'
import mapping from './mapping'
import { DesignSystemProvider } from '@strapi/design-system'

const EXIF = React.forwardRef((props, ref) => {
  // @ts-ignore
  const { attribute, disabled, label, name, onChange, required, value } = props // these are just some of the props passed by the content-manager
  const handleChange = (e: any) => {
    onChange({
      target: { name, type: attribute.type, value: e },
    })
  }

  const { form } = useContentManagerContext()
  const { values: modifiedData, onChange: onChangeForm } = form

  const prevData = React.useRef({ value: modifiedData }).current

  React.useEffect(() => {
    const curHash = modifiedData.photo?.hash
    const prevHash = prevData.value.photo?.hash

    if (curHash && curHash !== prevHash) distribute_exif()

    return () => {
      prevData.value = modifiedData
    }
  }, [modifiedData])

  let exif: { [key: string]: any } = {}

  const update_exif = async () => {
    exif = await parse(modifiedData.photo.url)
    await onChange({
      target: {
        name,
        type: attribute.type,
        value: JSON.stringify(exif, undefined, 2),
      },
    })
  }

  const distribute_exif = async () => {
    if (Object.keys(exif).length === 0) await update_exif()
    mapping.forEach(async ([name, from, type]) => {
      //@ts-ignore
      await onChangeForm({
        target: {
          name,
          type,
          value: typeof from === 'function' ? from(exif) : exif[from],
        },
      })
    })
  }

  return (
    <DesignSystemProvider>
      <Field.Root>
        <Field.Label>{label}</Field.Label>
        <Accordion.Root>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger>View EXIF Data</Accordion.Trigger>
              <Accordion.Actions>
                <IconButton label="Distribute EXIF Data" onClick={distribute_exif}>
                  <ArrowClockwise />
                </IconButton>
              </Accordion.Actions>
            </Accordion.Header>
            <Accordion.Content>
              <JSONInput
                name={name}
                ref={ref}
                disabled={disabled}
                value={typeof value === 'object' ? JSON.stringify(value, undefined, 4) : value}
                required={required}
                onChange={handleChange}
              />
              <Field.Error />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </Field.Root>
    </DesignSystemProvider>
  )
})

export default EXIF
