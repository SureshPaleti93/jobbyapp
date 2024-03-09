import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJob from '../SimilarJob'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: '',
    similarJobs: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const jobDetailsApi = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobDetailsApi, options)
    const data = await response.json()
    if (response.ok === true) {
      this.jobDetailsSuccess(data)
    }
  }

  jobDetailsSuccess = data => {
    const job = data.job_details
    const similerJobs = data.similar_jobs
    const updatedJob = {
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
      lifeAtCompany: job.life_at_company,
      skills: job.skills,
      companyWebsiteUrl: job.company_website_url,
    }

    const updatedSimilarJobs = similerJobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({
      jobDetails: updatedJob,
      similarJobs: updatedSimilarJobs,
      apiStatus: apiStatusConstants.success,
    })
  }

  onRetryClick = () => this.getJobDetails()

  renderFailureView = () => (
    <>
      <Header />
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
        <button
          type="button"
          className="retry-btn-element"
          onClick={this.onRetryClick}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <div className="success-bg-container">
        <Header />
        <div className="job-details-container">
          <div className="company-details">
            <img
              className="comapny-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <>
              <p className="job-title">{title}</p>
              <p className="rating">
                <FaStar style={{color: 'yellow'}} />
                {'  '}
                {rating}
              </p>
            </>
          </div>
          <div className="sal-details-container">
            <div className="location-container">
              <p className="location-element">
                <MdLocationOn />
                {'  '} {location}
              </p>
              <p className="location-element">
                <BsBriefcaseFill />
                {'  '}
                {employmentType}
              </p>
            </div>
            <p className="location-element">{packagePerAnnum}</p>
          </div>
          <hr style={{width: '100%'}} />
          <div className="descr-container">
            <h3>Description</h3>
            <a
              href={companyWebsiteUrl}
              target="blank"
              className="visit-element"
            >
              Visit
              {'  '}
              <FaExternalLinkAlt />
            </a>
          </div>
          <p className="descr-element">{jobDescription}</p>
          <h3 className="skills">Skills</h3>
          <ul className="list-container">
            {skills.map(eachSkill => (
              <li className="list-element">
                <img
                  className="skill-img"
                  src={eachSkill.image_url}
                  alt={eachSkill.name}
                />
                {eachSkill.name}
              </li>
            ))}
          </ul>
          <h3 className="skills">LIfe At Company</h3>
          <div className="life-at-company-container">
            <p className="life-at-cmpny-descr">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <ul className="similar-job-list-container">
          {similarJobs.map(eachjob => (
            <SimilarJob key={eachjob.id} similarJob={eachjob} />
          ))}
        </ul>
      </div>
    )
  }

  renderInProgressView = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default JobDetails
