
import React, { useEffect } from 'react';
import Login from './Components/Login/Login';
import { getTokenFromUrl } from './Components/Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Components/Player/Player';
import { useStateValue } from './Components/Provider';


const Api = new SpotifyWebApi();

function App () {

  const [{ token },dispatch] = useStateValue();
   

    useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash = "";

      const token_1 = hash.access_token;

      if (token_1) {
        Api.setAccessToken(token_1);

        dispatch({
          type: 'SET_TOKEN',
          token: token_1,
        })
        

        Api.getPlaylist("37i9dQZF1E372YRpYLDYNB").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
        );

        Api.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
        );

        dispatch({
          type: "SET_SPOTIFY",
          spotify: Api,
        });
        
        Api.getMe().then(user => {
          dispatch({
            type: 'SET_USER',
            user,
          })
        })

        Api.getUserPlaylists().then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists,
          });
        });
       }
      }, [token, dispatch]);

  return (
       <div className="app">
        {
          token ? (<Player spotify={Api}/>): (<Login/>)
        }
      </div>
  );
}

export default App;
