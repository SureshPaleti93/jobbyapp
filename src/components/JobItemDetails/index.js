import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItemDetails = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="link-element">
      <li className="job-list-container">
        <div className="company-logo-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="rating-title-container">
            <p className="job-title">{title}</p>
            <p className="rating">
              <FaStar style={{color: 'yellow'}} />
              {rating}
            </p>
          </div>
        </div>
        <div className="sal-loc-emp-type-container">
          <div className="location-contaainer">
            <p className="location-element">
              <MdLocationOn /> {'  '}
              {location}
            </p>
            <p className="location-element">
              <BsFillBriefcaseFill />
              {'  '} {employmentType}
            </p>
          </div>
          <p className="sal-element">{packagePerAnnum}</p>
        </div>
        <hr />
        <h3 className="descr-heading">Description</h3>
        <p className="descr-element">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItemDetails
