import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import Header from '../Header'
import ReactContext from '../../ReactContext'
import SideBar from '../SideBar'
import './index.css'

class SavedVideos extends Component {
  renderVideo = videoDetails => {
    const {
      id,
      title,
      thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
    } = videoDetails
    const {name} = channel
    const time = formatDistanceToNow(new Date(publishedAt))
    return (
      <ReactContext.Consumer>
        {value => {
          const {light} = value
          return (
            <div className=" trending-video-con">
              <Link
                to={`/videos/${id}`}
                className={`row ${light === true ? 'light-link' : 'dark-link'}`}
              >
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail-img"
                />
                <div>
                  <p>{title}</p>
                  <p>{name}</p>
                  <div className="row ">
                    <p className="right-space">{viewCount} views</p>
                    <p>{time} ago</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  renderSuccessView = () => (
    <ReactContext.Consumer>
      {value => {
        const {savedItems} = value
        console.log(savedItems)
        if (savedItems.length === 0) {
          return (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
                className="no-videos"
              />
              <h1>No saved videos found</h1>
              <p>you can save your videos while watching them</p>
            </div>
          )
        }
        return (
          <ul className="list-con">
            {savedItems.map(item => (
              <li key={item.id}>{this.renderVideo(item)}</li>
            ))}
          </ul>
        )
      }}
    </ReactContext.Consumer>
  )

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
                <div>
                  <h1>Saved Videos</h1>
                  {this.renderSuccessView()}
                </div>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default SavedVideos
