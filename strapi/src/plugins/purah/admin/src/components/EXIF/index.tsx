import * as React from 'react'

import { useIntl } from 'react-intl'
import { useCMEditViewDataManager } from '@strapi/helper-plugin'
import {
  JSONInput,
  FieldLabel,
  Field,
  IconButton,
  FieldError,
  Accordion,
  AccordionContent,
  AccordionToggle,
} from '@strapi/design-system'

import { Spark } from '@strapi/icons'
import { parse } from 'exifr'
import mapping from './mapping'

const EXIF = React.forwardRef((props, ref) => {
  // @ts-ignore
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props // these are just some of the props passed by the content-manager

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

  const prevData = React.useRef({ value: modifiedData }).current

  React.useEffect(() => {
    // console.log(modifiedData, prevData.value)
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
      await onChangeForm({
        target: {
          name,
          type,
          value: typeof from === 'function' ? from(exif) : exif[from],
        },
      })
    })
  }
  const [expanded, setExpanded] = React.useState(false)

  return (
    <Field name="EXIF">
      {/* <FieldLabel>{formatMessage(intlLabel)} </FieldLabel> */}
      <Accordion
        variant="primary"
        expanded={expanded}
        onToggle={() => setExpanded((s) => !s)}
        id="acc-1"
        size="S"
      >
        <AccordionToggle title="EXIF"></AccordionToggle>
        <AccordionContent>
          <IconButton
            label="Regenerate"
            size="L"
            variant="secondary"
            onClick={distribute_exif}
          >
            <Spark />
          </IconButton>
          <JSONInput
            ref={ref}
            name={name}
            disabled={disabled}
            value={value}
            required={required}
            onChange={handleChange}
          />
          <FieldError />
        </AccordionContent>
      </Accordion>
    </Field>
  )
})

export default EXIF
