import React from 'react'
import {Link} from 'react-router-dom'

const Track = ({track}) => {
  console.log(track)
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-play"></i> Track
            </strong>
            : {track.track_name}
          </p>
          <br />
          <p className="card-text">
            <strong>
              <i className="fas fa-compact-disc"></i> Album
            </strong>
            : {track.track_album_name}
          </p>
          <Link to={`lyrics/track/${track.track_id}`} className="btn btn-primary btn-block">
            <i className="fas fa-chevron-right"></i> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Track;
