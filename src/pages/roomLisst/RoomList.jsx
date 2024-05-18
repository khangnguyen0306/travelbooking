import React from 'react'
import { useGetroomsQuery } from '../../services/roomAPI'

const RoomList = () => {
    const { data: roomdata, isLoading } = useGetroomsQuery();
    console.log(roomdata);
    return (
        <div>
            hi
        </div>
    )
}

export default RoomList