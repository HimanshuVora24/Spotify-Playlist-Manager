import axios from 'axios';
import React, { useEffect , useState } from 'react';

function Playlists(props) {
    //const [playlist_data, setPlaylistData] = useState([]);
    const [auth_token, setAuthToken] = useState("");
    useEffect(() => {
        if (window.localStorage.getItem('spotify_token')) {
            setAuthToken(window.localStorage.getItem('spotify_token'));
        } 
    });
    
    const getPlaylists = () => {
        axios.get('https://api.spotify.com/v1/me/playlists/', {
            params: {
                offset: 0,
                limit: 50,
            },
            headers: {
                Authorization: 'Bearer ' + auth_token, 
            },
        }).then((response)=>{
            props.update_playlists(response.data.items);
        }).catch((error)=>console.log(error)); 
    };

    

    return(<button onClick={getPlaylists}>Refresh Playlists</button>);
}


export default Playlists;

