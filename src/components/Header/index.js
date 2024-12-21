import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {FiLogOut, FiSun} from 'react-icons/fi'
import {SiYoutubegaming} from 'react-icons/si'
import {GiSaveArrow} from 'react-icons/gi'
import {IoIosHome, IoIosTrendingUp} from 'react-icons/io'
import {IoMenu} from 'react-icons/io5'
import {FaMoon} from 'react-icons/fa'
import ReactContext from '../../ReactContext'

import './index.css'

class Header extends Component {
  state = {menu: false}

  render() {
    return (
      <ReactContext.Consumer>
        {value => {
          const {light, onChangeTheme} = value
          const logout = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/login')
          }
          const toggleMenu = () =>
            this.setState(prevState => ({menu: !prevState.menu}))
          const {menu} = this.state
          const toggleTheme = () => {
            onChangeTheme()
          }
          return (
            <div className={light === true ? '' : 'dark-home-bg'}>
              <div className="row row-space header-bg">
                <Link to="/">
                  {light === true ? (
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
                </Link>
                <div className="row">
                  <button
                    type="button"
                    className="sm-btn"
                    onClick={toggleTheme}
                    data-testid="theme"
                  >
                    {light === true ? (
                      <FaMoon className="moon" />
                    ) : (
                      <FiSun className="sun" />
                    )}
                  </button>
                  <div className="profile-md">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="profile-img"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="menu-sm sm-btn"
                  >
                    <IoMenu />
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="logout-sm sm-btn"
                  >
                    <FiLogOut />
                  </button>
                  <button
                    type="button"
                    className="outline-primary logout-md"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
              {menu ? (
                <ul className="list">
                  <li>
                    <Link to="/" className={light ? 'light-link' : 'dark-link'}>
                      <IoIosHome />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/trending"
                      className={light ? 'light-link' : 'dark-link'}
                    >
                      <IoIosTrendingUp />
                      Trending
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gaming"
                      className={light ? 'light-link' : 'dark-link'}
                    >
                      <SiYoutubegaming />
                      Gaming
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/saved-videos"
                      className={light ? 'light-link' : 'dark-link'}
                    >
                      <GiSaveArrow />
                      Saved Videos
                    </Link>
                  </li>
                </ul>
              ) : (
                ''
              )}
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default withRouter(Header)
