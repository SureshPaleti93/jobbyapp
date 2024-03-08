import './index.css'

const SalaryRangeItem = props => {
  const {eachRange, onSalaryOption} = props
  const {salaryRangeId, label} = eachRange

  const onSalaryChange = event => {
    onSalaryOption(event.target.value)
  }

  return (
    <li className="sal-list-element">
      <input
        name="sal-range"
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={onSalaryChange}
      />{' '}
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryRangeItem
