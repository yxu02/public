import React, { Component } from "react";
import ReactDom from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import _ from "lodash";
import API_KEY from '../keys'


//Create a new component. This component should produce some HTML
class App extends Component {
  //react class constructor always called with props
  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };
    this.videoSearch("Tom Brady");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({ videos: videos, selectedVideo: videos[0] });
    });
  }

  //Important: render() called right after constructor. YTSearch above is async
  //therefore render() called before YTSearch returns callback. Therefore state
  //props are empty. Need to handle null props.
  render() {
    //throttle searchbar typing changes to certain frequency
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 500);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelected={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

//Take this component's generated HTML and put it on the page (in the DOM)
ReactDom.render(<App />, document.querySelector(".container"));
