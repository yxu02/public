import React from "react";
import VideoListItem from "./video_list_item";

const VideoList = (props) => {
  //for functional component, reach props keys by props.xxx
  //but for class component, reach props keys by this.props.xxx
  return (
    <ul className="col-md-4 list-group">
      {props.videos.map(video => {
        return (
          <VideoListItem onVideoSelected={props.onVideoSelected} key={video.etag} video={video} />
        );
      })}
    </ul>
  );
};

export default VideoList;
