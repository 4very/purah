import * as React from 'react'

import { useIntl } from 'react-intl'
import { useCMEditViewDataManager } from '@strapi/helper-plugin'
import {
  JSONInput,
  FieldLabel,
  Field,
  IconButton,
  FieldError,
} from '@strapi/design-system'
import { Spark } from '@strapi/icons'
import { parse } from 'exifr'
import mapping from './mapping'

const EXIF = React.forwardRef((props, ref) => {
  // @ts-ignore
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props // these are just some of the props passed by the content-manager
  const { formatMessage } = useIntl()

  const handleChange = (e: any) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    })
  }
  const {
    modifiedData,
    onChange: onChangeForm,
    ...rest
  } = useCMEditViewDataManager()

  let exif: { [key: string]: any } = {}

  const update_exif = async () => {
    exif = await parse(modifiedData.photo.url)
    console.log(modifiedData)
    await onChange({
      target: {
        name,
        type: attribute.type,
        value: JSON.stringify(exif, undefined, 2),
      },
    })
  }

  const distribute_exif = async () => {
    mapping.forEach(async ([name, from, type]) => {
      await onChangeForm({
        target: {
          name,
          type,
          value: exif[from],
        },
      })
    })
  }

  return (
    <Field name="EXIF">
      <FieldLabel>{formatMessage(intlLabel)} </FieldLabel>
      <JSONInput
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
      />
      <FieldError />
      <IconButton
        label="Regenerate"
        size="S"
        variant="secondary"
        onClick={update_exif}
      >
        <Spark />
      </IconButton>
      <IconButton
        label="Regenerate"
        size="L"
        variant="secondary"
        onClick={distribute_exif}
      >
        <Spark />
      </IconButton>
    </Field>
  )
})

export default EXIF
