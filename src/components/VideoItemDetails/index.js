import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {GiSaveArrow} from 'react-icons/gi'
import Cookies from 'js-cookie'
import Header from '../Header'
import ReactContext from '../../ReactContext'
import SideBar from '../SideBar'
import './index.css'

class VideoItemDetails extends Component {
  state = {data: {}, status: 'loading', like: false, dislike: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedVideo = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      const updatedData = {
        videoDetails: updatedVideo,
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
    return this.renderVideo()
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

  getEmbedUrl = videoUrl => {
    const videoId = videoUrl.split('v=')[1] // Extract videoId from the URL
    return `https://www.youtube.com/embed/${videoId}`
  }

  handleLike = () => this.setState({like: true, dislike: false})

  handleDislike = () => this.setState({dislike: true, like: false})

  renderVideo = () => {
    const {data} = this.state
    const {videoDetails} = data
    const {
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    const time = formatDistanceToNow(new Date(publishedAt))
    const {like, dislike} = this.state
    return (
      <ReactContext.Consumer>
        {value => {
          const {onSaveItem} = value
          return (
            <div>
              <iframe
                width="600"
                height="340"
                src={this.getEmbedUrl(videoUrl)}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p>{title}</p>
              <div className="item-details-md">
                <div className="row row-space">
                  <p>{viewCount} views</p>
                  <p>{time} ago</p>
                </div>
                <div className="row">
                  <button
                    type="button"
                    className="button"
                    onClick={this.handleLike}
                  >
                    <AiOutlineLike
                      className={like ? 'true-btn' : 'false-btn'}
                    />
                    Like
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={this.handleDislike}
                  >
                    <BiDislike className={dislike ? 'true-btn' : 'false-btn'} />
                    Dislike
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => onSaveItem(videoDetails)}
                  >
                    <GiSaveArrow />
                    Save
                  </button>
                </div>
              </div>
              <div className="home-row">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile-img"
                />
                <div>
                  <p>{name}</p>
                  <p>{subscriberCount} subscribers</p>
                </div>
              </div>
              <p>{description}</p>
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
              data-testid="videoItemDetails"
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
export default VideoItemDetails
