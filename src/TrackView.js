import React, { useEffect , useState } from 'react';
import './TrackView.css'

function TrackView(props) {
    const track_map = props.track_list.map((track) => 
        <div className = 'track_box' key={track.track.id}>
            <img className='track_image' src={track.track.album.images[0].url}></img>
            <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{paddingBottom:'2px'}}>{"\"" + track.track.name + "\" - " + track.track.artists.map((artist) => artist.name).join(', ')}</div>
                <div style={{fontStyle: 'italic'}}>{track.track.album.name}</div>
            </div>
        </div>
    );
    

    return(<div >{track_map}</div>);
}

export default TrackView; 