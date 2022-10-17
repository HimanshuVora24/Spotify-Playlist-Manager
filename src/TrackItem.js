import React, { useEffect , useState } from 'react';
import './TrackView.css'

function TrackItem(props) {
    const track = props.track_info; 

    const [select, setSelect] = useState('whitesmoke');
    
    const selectTrack = () => {
        if (select === 'whitesmoke') setSelect('black');
        else setSelect('whitesmoke');
    }

    return (
    <div className = 'track_box' key={track.track.id}>
        <img className='track_image' src={track.track.album.images[0].url}></img>
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <div className='track_text' style={{paddingBottom:'2px', fontWeight: 'bold'}}>{track.track.name}</div>
            <div className='track_text' style={{paddingBottom:'2px'}}>{track.track.artists.map((artist) => artist.name).join(', ')}</div>
            <div className='track_text' style={{fontStyle: 'italic'}}>{track.track.album.name}</div>
        </div>
        <div className='select_track' onClick = {selectTrack} style={{backgroundColor:`${select}`}}></div>
    </div>);
}

export default TrackItem;