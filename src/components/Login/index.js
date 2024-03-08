import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      this.setState({showErrorMsg: false})
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    return (
      <div className="login-bg-container">
        <div className="login-form-container">
          <div className="login-form">
            <img
              className="company-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <form className="form-element" onSubmit={this.onSubmitForm}>
              <label htmlFor="userName" className="label-element">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="input-element"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="formPassword" className="label-element">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                placeholder="Password"
                type="password"
                id="formPassword"
                className="input-element"
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
        <div className="login-form-sm">
          <img
            className="company-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-element" onSubmit={this.onSubmitForm}>
            <label htmlFor="userNameSm" className="label-element">
              USERNAME
            </label>
            <input
              onChange={this.onChangeUsername}
              type="text"
              id="userNameSm"
              className="input-element"
              placeholder="Username"
            />
            <label htmlFor="formPasswordSm" className="label-element">
              PASSWORD
            </label>
            <input
              onChange={this.onChangePassword}
              placeholder="Password"
              type="password"
              id="formPasswordSm"
              className="input-element"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
