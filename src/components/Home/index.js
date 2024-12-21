import {Component} from 'react'
import {IoMdClose, IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import ReactContext from '../../ReactContext'
import SideBar from '../SideBar'
import './index.css'

class Home extends Component {
  state = {banner: true, data: {}, status: 'loading', searchInput: ''}

  componentDidMount() {
    this.getData()
  }

  toggleBanner = () => {
    this.setState({banner: false})
  }

  changeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  onSearch = () => {
    this.getData()
    this.setState({status: 'loading'})
  }

  getData = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        channel: {
          name: item.channel.name,
          profileImageUrl: item.channel.profile_image_url,
        },
        viewCount: item.view_count,
        publishedAt: item.published_at,
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
              alt="failure view"
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
    if (videos.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="no-videos"
          />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button type="button" onClick={() => this.getData()}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <div className="row wrap">
        {videos.map(item => (
          <ul key={item.id} className="list-con">
            {this.renderVideo(item)}
          </ul>
        ))}
      </div>
    )
  }

  renderVideo = item => {
    const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = item
    const {name, profileImageUrl} = channel
    const time = formatDistanceToNow(new Date(publishedAt))
    return (
      <ReactContext.Consumer>
        {value => {
          const {light} = value
          return (
            <li className="video-container">
              <Link
                to={`/videos/${id}`}
                className={light === true ? 'light-link' : 'dark-link'}
              >
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail"
                />
                <div className="home-row">
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
                    className="profile-img"
                  />
                  <p>{title}</p>
                </div>
                <div className="row row-space">
                  <p>{name}</p>
                  <p>{viewCount}Views</p>
                  <p>{time} ago</p>
                </div>
              </Link>
              ,
            </li>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  render() {
    const {banner, searchInput} = this.state
    return (
      <ReactContext.Consumer>
        {value => {
          const {light} = value
          return (
            <div
              data-testid="home"
              className={`'home-bg' ${
                light === true ? 'light-home-bg' : 'dark-home-bg'
              }`}
            >
              <Header />
              <div className="home-row">
                <SideBar />
                <div>
                  {banner === true && (
                    <div className="banner" data-testid="banner">
                      <button
                        type="button"
                        data-testid="close"
                        className="button"
                        onClick={this.toggleBanner}
                      >
                        <IoMdClose />
                      </button>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                        className="logo"
                      />
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      data-testid="searchButton"
                      className="search-button"
                      onClick={this.onSearch}
                    >
                      <input
                        type="search"
                        placeholder="Search"
                        onChange={this.changeSearch}
                        value={searchInput}
                      />
                      <IoIosSearch className={light ? '' : 'white'} />
                    </button>
                  </div>
                  {this.renderData()}
                </div>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default Home
