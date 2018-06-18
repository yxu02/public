import React from "react";

//video passed into props from video_list is stored at props.video
//use ES6 to tare it out
const VideoListItem = ({ video, onVideoSelected }) => {
  return (
    //selected video is bubbled up from VideoListItem to VideoList
    //eventually reach index.js <VideoList> where the callback was originally called
    //selected video becomes the argument to fulfill the callback function body in index.js
    //to this.setState({selectedVideo})
    <li className="list-group-item" onClick={()=>{onVideoSelected(video)}}>
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={video.snippet.thumbnails.default.url}/>
        </div>

        <div className="media-body">
          <div className="media-heading">{video.snippet.title}</div>
        </div>
      </div>
    </li>);
};

export default VideoListItem;
