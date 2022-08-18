

function SpotifyLoginButton(props) {
    const ENDPOINT = 'https://accounts.spotify.com/authorize?';
    const CLIENT_ID = '5120d388f67540a897ebbb099ee5514a';
    const SCOPES_LIST = 'user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative';
    const REDIRECT_URI = 'http://localhost:3000/';

    var auth_link = `${ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${encodeURIComponent(SCOPES_LIST)}&response_type=token&show_dialog`;
    
    const handleLogin = () => {
        window.location = auth_link; 
    };

    return (
        <button onClick={handleLogin}>
            {props.button_string}
        </button> 
    ); 
}


export default SpotifyLoginButton;