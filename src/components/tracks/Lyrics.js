import React, { Component } from 'react';
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((res) => {
        this.setState({ track: res.data.message.body.track });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    if (track === undefined || lyrics === undefined || Object.keys(track).lenght === 0 || Object.keys(lyrics).length === 0) {
      return <Spinner />
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-primary btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h4 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h4>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body} </p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            {/*<li className="list-group-item">
              <strong>Song Genre</strong>: {' '}
              {
                track.primary_genres.music_genre_list[0].music_genre.music_genre_name
              }
            </li>*/}
            <li className="list-group-item">
              <strong>Explicit Words</strong>:{" "}
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
          </ul>
        </React.Fragment>
      );
    }
  } 
}

   

export default Lyrics
