import * as React from 'react'
import { Field, Combobox, ComboboxOption } from '@strapi/design-system'

import photoSchema from '../../../../../../api/photo/content-types/photo/schema.json'

const PhotoKey = React.forwardRef((props, ref) => {
  // @ts-ignore
  const { attribute, disabled, label, name, onChange, required, value } = props
  const handleChange = (e: any) => {
    onChange({
      target: { name, type: attribute.type, value: e },
    })
  }

  const comboOptions = Object.keys(photoSchema.attributes).map((key) => (
    <ComboboxOption key={key} value={key}>
      {key}
    </ComboboxOption>
  ))

  return (
    <Field.Root name="PhotoKey">
      <Field.Label>{label}</Field.Label>
      <Combobox
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
      >
        {comboOptions}
      </Combobox>
      <Field.Error />
    </Field.Root>
  )
})

export default PhotoKey
