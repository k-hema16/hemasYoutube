import {GiSaveArrow} from 'react-icons/gi'
import {SiYoutubegaming} from 'react-icons/si'
import {IoIosHome, IoIosTrendingUp} from 'react-icons/io'
import {Link} from 'react-router-dom'
import ReactContext from '../../ReactContext'

const SideBar = () => (
  <ReactContext.Consumer>
    {value => {
      const {light} = value
      return (
        <div className="col-space">
          <ul className="list-md">
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
              <Link to="/gaming" className={light ? 'light-link' : 'dark-link'}>
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
          <div>
            <p>Contact Us</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="logo"
            />
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </ReactContext.Consumer>
)
export default SideBar
