import React from 'react'
import './Body.css'
import Header from '../Header/Header'
import { AiFillPlayCircle } from 'react-icons/ai'
import { GrFavorite } from 'react-icons/gr'
import {FiMoreHorizontal} from 'react-icons/fi'
import { useStateValue } from '../Provider'
import SongRow from '../SongRow/SongRow'

const Body = ({spotify}) => {

  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZF1E372YRpYLDYNB`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
    <Header spotify={spotify} />

    <div className="body__info">
      <img src={discover_weekly?.images[0].url} alt="" />
      <div className="body__infoText">
        <strong>PLAYLIST</strong>
        <h2>Discover Weekly</h2>
        <p>{discover_weekly?.description}</p>
      </div>
    </div>

    <div className="body__songs">
      <div className="body__icons">
        <AiFillPlayCircle
          className="body__shuffle"
          onClick={playPlaylist}
        />
        <GrFavorite fontSize="large" />
        <FiMoreHorizontal />
      </div>

      {discover_weekly?.tracks.items.map((item) => (
        <SongRow playSong={playSong} track={item.track} />
      ))}
    </div>
  </div>
  )
}

export default Body