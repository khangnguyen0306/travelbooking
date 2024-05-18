import React from 'react'
import { useGetroomsQuery } from '../../services/roomAPI'

const RoomList = () => {
    const { data: roomdata, isLoading } = useGetroomsQuery();
    console.log(roomdata);
    return (
        <div>
            <h1>Room List</h1>
            {isLoading ? <div>Rooms are loading</div> : <div>{roomdata.map(room => <div>{room.name}</div>)}</div>}
        </div>
    )
}

export default RoomList