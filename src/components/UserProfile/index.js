import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserProfile extends Component {
  state = {profile: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  profileSuccessView = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} className="profile-img" />
        <p className="profile-name">{name}</p>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  profileProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    if (response.status === 200) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        profile: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      console.log('failure')
    }
  }

  onRetryProfile = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getProfile)
  }

  profileFailureView = () => (
    <div className="retry-container">
      <button type="button" className="retry-btn" onClick={this.onRetryProfile}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.profileSuccessView()
      case apiStatusConstants.inProgress:
        return this.profileProgressView()
      case apiStatusConstants.failure:
        return this.profileFailureView()
      default:
        return null
    }
  }
}

export default UserProfile
