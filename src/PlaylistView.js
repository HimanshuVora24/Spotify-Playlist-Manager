import React, { useEffect , useState } from 'react';
import axios from 'axios';
import './PlaylistView.css';

function PlaylistView(props) {
    const [auth_token, setAuthToken] = useState("");
    useEffect(() => {
        if (window.localStorage.getItem('spotify_token')) {
            setAuthToken(window.localStorage.getItem('spotify_token'));
        } 
    });
    
    
    const handleClick = (playlist_href, num_tracks) => {
        var num_requests = Math.floor(num_tracks/50) + 1;
        let tracks = [];
        let promises = [];
        for (let i = 0; i < num_requests; i++) {
            promises.push(axios.get(playlist_href, {
                params: {
                    offset: i * 50,
                    limit: 50,
                },
                headers: {
                    Authorization: 'Bearer ' + auth_token, 
                },
            }).then((response)=>{
                tracks.push(...response.data.items);
                //console.log(tracks);
            }).catch((error)=>console.log(error))); 
        }
        //console.log(tracks);
        Promise.all(promises).then(() => props.update_tracks(tracks));
    };

    //useEffect(() => {console.log(track_data)}, [track_data]);

    const playlist_map = props.playlist_list.map((playlist) => 
        <div className='playlist_box' key={playlist.id} onClick = {() => handleClick(playlist.tracks.href, playlist.tracks.total)}>
            <div className='playlist_name'>{playlist.name}</div>
            <img className='playlist_image' src={playlist.images[0].url} />
        </div>
    );
    

    return(<div>{playlist_map}</div>);
}

export default PlaylistView; 