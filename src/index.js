import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useEffect , useState } from "react";
import SpotifyLoginButton from './spotify_auth';
import Playlists from './Playlists';
import PlaylistView from './PlaylistView';
import TrackView from './TrackView';
import axios from 'axios';

function getAuthorizationToken() {
  const hash = (window.location.hash).substring(1); 
  const token_string = (((hash.substring(1)).split('&'))[0]);
  const token = token_string.substring(token_string.indexOf("=") + 1);
  console.log(token);
  window.localStorage.clear();
  window.localStorage.setItem('spotify_token', token);
}
 
function App() {
  const [logged_in, setLogin] = useState(false);
  const [playlist_data, setPlaylistData] = useState([]);
  const [track_data, setTrackData] = useState([]);
  
  const getPlaylists = () => {
    axios.get('https://api.spotify.com/v1/me/playlists/', {
        params: {
            offset: 0,
            limit: 50,
        },
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('spotify_token'), 
        },
    }).then((response)=>{
        updatePlaylists(response.data.items);
    }).catch((error)=>console.log(error)); 
  };

  useEffect(() => {
    if (window.location.hash) {
      getAuthorizationToken();
      setLogin(true);
    } else {
      window.localStorage.clear();
      setLogin(false);
    }
  });

  useEffect(() => {
    if (logged_in) {
      getPlaylists();
    }
  }, [logged_in])

  useEffect(() => {console.log(playlist_data)}, [playlist_data]);
  useEffect(() => {console.log(track_data)}, [track_data]);

  const updatePlaylists = (playlist_arr) => {
    setPlaylistData(playlist_arr);
  }

  const updateTracks = (tracks_arr) => {
    setTrackData(tracks_arr);
  }

  return (
    <div className='app_background'>
      <div className = 'buttons'>
        <div style={{padding:'5px'}}><SpotifyLoginButton button_string={"Authenticate"} /></div>
        <div style={{paddingLeft:'5px'}}><Playlists update_playlists={updatePlaylists}/></div>
      </div>

      <div className='padding_playlist'>
        <div className='playlist_view'><PlaylistView playlist_list = {playlist_data} update_tracks = {updateTracks}/></div>
        <div className='track_view'><TrackView track_list = {track_data}/></div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  