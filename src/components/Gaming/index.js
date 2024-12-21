import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import ReactContext from '../../ReactContext'
import SideBar from '../SideBar'

class Gaming extends Component {
  state = {data: {}, status: 'loading'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedVideos = data.videos.map(item => ({
        id: item.id,
        title: item.title,
        thumbnailUrl: item.thumbnail_url,
        viewCount: item.view_count,
      }))
      const updatedData = {
        total: data.total,
        videos: updatedVideos,
      }
      this.setState({data: updatedData, status: 'success'})
    } else {
      this.setState({status: 'failure'})
    }
  }

  renderData = () => {
    const {status} = this.state
    if (status === 'loading') {
      return (
        <ReactContext.Consumer>
          {value => {
            const {light} = value
            return (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color={light ? 'black' : 'white'}
                  height="50"
                  width="50"
                />
              </div>
            )
          }}
        </ReactContext.Consumer>
      )
    }
    if (status === 'failure') {
      return this.renderFailureView()
    }
    return this.renderSuccessView()
  }

  renderFailureView = () => (
    <ReactContext.Consumer>
      {value => {
        const {light} = value
        return (
          <div>
            <img
              src={
                light === true
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure-view"
              className="failure"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request.Please Try
              Again.
            </p>
            <button type="button" onClick={() => this.getData()}>
              Retry
            </button>
          </div>
        )
      }}
    </ReactContext.Consumer>
  )

  renderSuccessView = () => {
    const {data} = this.state
    const {videos} = data
    return (
      <div>
        <h1>Gaming</h1>
        <ul className="list-con row-flex">
          {videos.map(item => (
            <li key={item.id}>{this.renderVideo(item)}</li>
          ))}
        </ul>
      </div>
    )
  }

  renderVideo = item => {
    const {id, title, thumbnailUrl, viewCount} = item
    return (
      <ReactContext.Consumer>
        {value => {
          const {light} = value
          return (
            <div className="video-container">
              <Link
                to={`/videos/${id}`}
                className={light === true ? 'light-link' : 'dark-link'}
              >
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail-img"
                />
                <p>{title}</p>
                <p>{viewCount} views</p>
              </Link>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  render() {
    return (
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
                {this.renderData()}
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default Gaming
