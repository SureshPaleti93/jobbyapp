import {Component} from 'react'

import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobs: [], controls: ''}

  componentDidMount() {
    this.getJobs()
  }

  renderSuccessView = () => {
    const {jobs} = this.state
    return (
      <div>
        <p>hgddfhgvh</p>
      </div>
    )
  }

  getJobs = async () => {
    const {selectedOptions} = this.props
    this.setState({controls: selectedOptions})
    const {
      selectedSalaryRange,
      selectedEmploymentType,
      searchedInput,
    } = selectedOptions

    const jwtToken = Cookies.get('jwt_token')

    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentType.toString()}&minimum_package=${selectedSalaryRange}&search=${searchedInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsUrl, options)
    const data = await response.json()

    if (response.status === 200) {
      this.successView(data.jobs)
    } else {
      this.failureView(data)
    }
  }

  successView = jobs => {
    const updatedJobs = jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({apiStatus: apiStatusConstants.success, jobs: updatedJobs})
  }

  render() {
    const {apiStatus, controls} = this.state
    console.log(controls)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default JobDetails
