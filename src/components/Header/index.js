import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-lg">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="ul-elements">
          <Link to="/" className="link-element">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="link-element">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="nav-sm">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="ul-elements-sm">
          <Link to="/" className="link-element">
            <IoMdHome className="home-icon" />
          </Link>
          <Link to="/" className="link-element">
            <BsFillBriefcaseFill className="home-icon" />
          </Link>
          <button type="button" className="sm-button-logout" onClick={onLogout}>
            <FiLogOut className="home-icon" />{' '}
          </button>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
