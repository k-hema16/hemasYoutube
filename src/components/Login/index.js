import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import PrimaryBtn from '../StyledComponents'
import ReactContext from '../../ReactContext'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    err: '',
    showError: false,
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const UserDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitFailure = error => {
    this.setState({err: error, showError: true})
  }

  render() {
    const {username, password, showPassword, err, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ReactContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <div className={theme === 'dark' ? 'login-dark-bg' : 'login-bg'}>
              <div
                className={`form-container ${
                  theme === 'dark' ? 'dark-form' : ''
                }`}
              >
                {theme === 'light' ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="logo"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="logo"
                  />
                )}
                <form onSubmit={this.submitForm} className="form">
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    id="password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                  <div>
                    <input
                      type="checkBox"
                      id="checkBox"
                      onChange={this.onChangeShowPassword}
                    />
                    <label htmlFor="checkBox">Show Password</label>
                  </div>
                  <PrimaryBtn>Login</PrimaryBtn>
                  <p className="red">{showError ? err : ''}</p>
                </form>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default Login
