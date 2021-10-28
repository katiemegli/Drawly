import * as React from "react";
import { useData, useUserState } from '../utilities/firebase.js';
import Image from 'react-bootstrap/Image'

const Calendar = () => {
    const [user] = useUserState();
    const [images, loading, error] = useData(user ? user.uid : "no_user");

    const formattedImages = () => Object.keys(images ?? {}).map(key =>
        <div style={{margin: '10px'}}>
            <Image key={key} src={`data:image/svg+xml;utf8,${encodeURIComponent(images[key])}`} roundedCircle style={{ background: 'black', height: 50 }} />
            <span> {key.replace('_', ', ').replace('_', ' ').replace('_', ', ')}</span><br></br>
        </div>
    );

    return (
        <div style={{ overflow: 'scroll' }}>
            <h1>Mood Log</h1>
            {loading ? <p>Images loading...</p> : 
            error ? <p>Error loading images</p> :
            formattedImages()}
        </div>
    )
}
export default Calendar;
