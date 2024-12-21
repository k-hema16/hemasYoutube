import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import ReactContext from './ReactContext'
import Login from './components/Login'
import Protected from './components/Protected'
import Home from './components/Home'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
class App extends Component {
  state = {light: true, itemsList: []}

  onChangeTheme = () => {
    this.setState(prevState => ({light: !prevState.light}))
  }

  onSaveItem = videoDetails => {
    this.setState(prevState => {
      const isAlreadySaved = prevState.itemsList.some(
        item => item.id === videoDetails.id,
      )
      return isAlreadySaved
        ? null
        : {itemsList: [...prevState.itemsList, videoDetails]}
    })
  }

  render() {
    const {light, itemsList} = this.state
    console.log(itemsList)
    return (
      <ReactContext.Provider
        value={{
          onChangeTheme: this.onChangeTheme,
          light,
          savedItems: itemsList,
          onSaveItem: this.onSaveItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Protected exact path="/" component={Home} />
          <Protected exact path="/trending" component={Trending} />
          <Protected exact path="/videos/:id" component={VideoItemDetails} />
          <Protected exact path="/saved-videos" component={SavedVideos} />
          <Protected exact path="/gaming" component={Gaming} />
          <Route component={NotFound} />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
