import './index.css'

const EmploymentTypeItem = props => {
  const {eachType, onChangeEmploymentOption} = props
  const {label, employmentTypeId} = eachType

  const onChangeValue = event => {
    onChangeEmploymentOption(event.target.value)
  }

  return (
    <li className="label-element">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={onChangeValue}
        value={employmentTypeId}
      />{' '}
      {'  '}
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default EmploymentTypeItem
