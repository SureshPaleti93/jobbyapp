import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {IoSearchOutline} from 'react-icons/io5'

import Header from '../Header'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import UserProfile from '../UserProfile'
import JobItemDetails from '../JobItemDetails'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    selectedSalaryRange: '',
    selectedEmploymentType: '',
    searchedInput: '',
    apiStatus: apiStatusConstants.initial,
    jobs: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {
      selectedEmploymentType,
      selectedSalaryRange,
      searchedInput,
    } = this.state

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentType.toString()}&minimum_package=${selectedSalaryRange}&search=${searchedInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.jobsSuccess(data.jobs)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  jobsSuccess = data => {
    const updatedJobs = data.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({jobs: updatedJobs, apiStatus: apiStatusConstants.success})
  }

  renderSuccessView = () => {
    const {jobs} = this.state
    console.log(jobs.length)
    if (jobs.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            className="no-jobs-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 style={{color: 'white'}}>No Jobs Found</h1>
          <p style={{color: 'white'}}>
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul>
        {jobs.map(eachJob => (
          <JobItemDetails key={jobs.id} job={eachJob} />
        ))}
      </ul>
    )
  }

  onClockRetry = () => this.getJobs()

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-descr">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.onClockRetry}>
        Retry
      </button>
    </div>
  )

  jobCards = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeEmploymentOption = event => {
    const {selectedEmploymentType} = this.state
    if (selectedEmploymentType.includes(event) === true) {
      const updatedList = selectedEmploymentType.filter(each => each !== event)
      this.setState({selectedEmploymentType: updatedList}, this.getJobs)
    } else {
      this.setState(
        prevState => ({
          selectedEmploymentType: [...prevState.selectedEmploymentType, event],
        }),
        this.getJobs,
      )
    }
  }

  onSalaryOption = event => {
    this.setState({selectedSalaryRange: event}, this.getJobs)
  }

  onSearchInput = event => {
    this.setState({searchedInput: event.target.value}, this.getJobs)
  }

  render() {
    const {
      selectedSalaryRange,
      selectedEmploymentType,
      searchedInput,
    } = this.state

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
            {this.jobCards()}
          </div>
        </div>
        <div className="content-container-small">
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
          <div className="profil">
            <UserProfile />
          </div>
          <hr style={{width: '90vw'}} />
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
          <hr style={{width: '90vw'}} />
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
        {this.jobCards()}
      </div>
    )
  }
}
export default Jobs
