import {Component} from 'react'

import {IoSearchOutline} from 'react-icons/io5'

import Header from '../Header'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import UserProfile from '../UserProfile'
import JobDetails from '../JobDetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    selectedSalaryRange: '',
    selectedEmploymentType: '',
    searchedInput: '',
  }

  onChangeEmploymentOption = event => {
    const {selectedEmploymentType} = this.state
    if (selectedEmploymentType.includes(event) === true) {
      const updatedList = selectedEmploymentType.filter(each => each !== event)
      this.setState({selectedEmploymentType: updatedList}, this.getJobs)
    } else {
      this.setState(prevState => ({
        selectedEmploymentType: [...prevState.selectedEmploymentType, event],
      }))
    }
  }

  onSalaryOption = event => {
    this.setState(prevState => ({selectedSalaryRange: event}))
  }

  onSearchInput = event => {
    this.setState({searchedInput: event.target.value})
  }

  render() {
    const {
      selectedSalaryRange,
      selectedEmploymentType,
      searchedInput,
    } = this.state

    const selectedOptions = {
      selectedSalaryRange,
      selectedEmploymentType,
      searchedInput,
    }

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="content-container">
          <div className="options-container">
            <div>
              <UserProfile />
            </div>
            <hr className="line-element" />
            <div className="filter-container">
              <p className="filter-heading">Type of Employment</p>
              <ul className="ul-container">
                {employmentTypesList.map(eachType => (
                  <EmploymentTypeItem
                    onChangeEmploymentOption={this.onChangeEmploymentOption}
                    key={eachType.employmentTypeId}
                    eachType={eachType}
                  />
                ))}
              </ul>
            </div>
            <hr className="line-element" />
            <div className="filter-container">
              <p className="filter-heading">Salary Range</p>
              <ul className="ul-container">
                {salaryRangesList.map(eachRange => (
                  <SalaryRangeItem
                    key={eachRange.salaryRangeId}
                    eachRange={eachRange}
                    onSalaryOption={this.onSalaryOption}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="search-container">
              <input
                type="search"
                className="seach-input-element"
                placeholder="Search"
                onChange={this.onSearchInput}
              />
              <div className="search-icon">
                <IoSearchOutline
                  className="search-element"
                  onClick={this.onClickSearch}
                />
              </div>
            </div>
            <JobDetails selectedOptions={selectedOptions} />
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
