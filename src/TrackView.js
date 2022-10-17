import React, { useEffect , useState } from 'react';
import './TrackView.css'
import TrackItem from './TrackItem.js'


function TrackView(props) {
    var track_map = props.track_list.map((track) => <TrackItem track_info = {track}/>);
    
    var track_map_second = track_map.splice(Math.ceil(track_map.length/2));

    return(
        <div style={{display:'flex', overflow:'hidden'}}>
            <div style={{flex: '0 0 50%', overflow:'hidden'}}>{track_map}</div>
            <div style={{flex: '1 0', overflow:'hidden'}}>{track_map_second}</div>
        </div>
    );
}

export default TrackView; 