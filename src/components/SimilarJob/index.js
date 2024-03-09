import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <li className="sim-list-conatiner">
      <div className="company-details-container">
        <img className="logo" src={companyLogoUrl} alt="comapny logo" />
        <div>
          <p className="title-elemnt">{title}</p>
          <p className="similar-rating-elemnt">
            <FaStar style={{color: '#fbbf24'}} />
            {'  '}
            {rating}
          </p>
        </div>
      </div>
      <h3 className="similar-job-heading">Description</h3>
      <p className="sim-descr">{jobDescription}</p>
      <div className="location-employment-container">
        <p className="similar-job-location">
          <MdLocationOn />
          {'  '}
          {location}
        </p>
        <p className="similar-job-location">
          <BsBriefcaseFill />
          {'  '}
          {employmentType}
        </p>
      </div>
    </li>
  )
}
export default SimilarJob
