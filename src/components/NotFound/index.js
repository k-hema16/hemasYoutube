import Header from '../Header'
import ReactContext from '../../ReactContext'
import SideBar from '../SideBar'

const NotFound = () => (
  <ReactContext.Consumer>
    {value => {
      const {light} = value
      return (
        <div
          data-testid="trending"
          className={`'home-bg' ${
            light === true ? 'light-home-bg' : 'dark-home-bg'
          }`}
        >
          <Header />
          <div className="home-row">
            <SideBar />
            <div>
              <img
                src={
                  light
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                }
                alt="not found"
                className="failure"
              />
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </div>
      )
    }}
  </ReactContext.Consumer>
)
export default NotFound
