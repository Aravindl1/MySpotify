import React, { useEffect } from 'react'
import './Footer.css'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { useStateValue } from '../Provider'
import { BiRepeat, BiShuffle, BiSkipPreviousCircle, BiSlider, BiSolidPlaylist, BiSolidSkipNextCircle, BiVolumeLow } from 'react-icons/bi'
import { GrGrid } from 'react-icons/gr'

const Footer = ({ spotify }) => {
  const [{ token, item, playing }, dispatch] = useStateValue();
   

  useEffect(() => {

    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
        });
      });
    }, [spotify]);

    const handlePlayPause = () => {
      if (playing) {
        spotify.pause();
        dispatch({
          type: "SET_PLAYING",
          playing: false,
        });
      } else {
        spotify.play();
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      }
    };

    const skipNext = () => {
      spotify.skipToNext();
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
    };

    const skipPrevious = () => {
      spotify.skipToPrevious();
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
    };

  return (
    <div className="footer">
    <div className="footer__left">
      <img
        className="footer__albumLogo"
        src={item?.album.images[0].url}
        alt={item?.name}
      />
      {item ? (
        <div className="footer__songInfo">
          <h4>{item.name}</h4>
          <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
      ) : (
        <div className="footer__songInfo">
          <h4>No song is playing</h4>
          <p>...</p>
        </div>
      )}
    </div>

    <div className="footer__center">
      <BiShuffle  className="footer__green" />
      <BiSkipPreviousCircle onClick={skipNext} className="footer__icon" />
      {playing ? (
        <AiOutlinePlayCircle
          onClick={handlePlayPause}
          fontSize="large"
          className="footer__icon"
        />
      ) : (
        <AiOutlinePlayCircle
          onClick={handlePlayPause}
          fontSize="large"
          className="footer__icon"
        />
      )}
      <BiSolidSkipNextCircle onClick={skipPrevious} className="footer__icon" />
      <BiRepeat className="footer__green" />
    </div>
    <div className="footer__right">
      <GrGrid container spacing={2}>
        <GrGrid item>
          <BiSolidPlaylist />
        </GrGrid>
        <GrGrid item>
          <BiVolumeLow  />
        </GrGrid>
        <GrGrid item xs>
          <BiSlider aria-labelledby="continuous-slider" />
        </GrGrid>
      </GrGrid>
    </div>
  </div>
  )
}

export default Footer