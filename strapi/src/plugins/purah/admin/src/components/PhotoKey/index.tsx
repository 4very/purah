import * as React from 'react'

import { useIntl } from 'react-intl'
import { useCMEditViewDataManager } from '@strapi/helper-plugin'
import {
  JSONInput,
  FieldLabel,
  Field,
  IconButton,
  FieldError,
  Combobox,
  ComboboxOption,
  CreatableCombobox,
} from '@strapi/design-system'

import photoSchema from '../../../../../../api/photo/content-types/photo/schema.json'

const PhotoKey = React.forwardRef((props, ref) => {
  // @ts-ignore
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props // these are just some of the props passed by the content-manager
  const { formatMessage } = useIntl()

  const handleChange = (e: any) => {
    onChange({
      target: { name, type: attribute.type, value: e },
    })
  }
  const {
    modifiedData,
    onChange: onChangeForm,
    ...rest
  } = useCMEditViewDataManager()

  const comboOptions = Object.keys(photoSchema.attributes).map((key) => (
    <ComboboxOption value={key}>{key}</ComboboxOption>
  ))

  return (
    <Field name="PhotoKey">
      <FieldLabel>{formatMessage(intlLabel)} </FieldLabel>
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
      <FieldError />
    </Field>
  )
})

export default PhotoKey
