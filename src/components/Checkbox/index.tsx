import { Field } from 'formik'
import { ChangeEvent, useId } from 'react'
import { Container } from './styles'

interface CheckboxProps {
  name?: string
  label: string
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

function Checkbox({ name, label, checked, onChange }: CheckboxProps) {
  const id = useId()

  return (
    <Container>
      {onChange ? (
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      ) : (
        <Field id={id} name={name} type="checkbox" checked={checked} />
      )}
      <label htmlFor={id}>{label}</label>
    </Container>
  )
}

export default Checkbox
