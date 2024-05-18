import React from 'react'
import { useGetRoomByIdQuery } from '../../services/roomAPI'

const RoomlistDetail = () => {
    const { data: roomDetail, isLoading } = useGetRoomByIdQuery();

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {
                roomDetail.map((room) => {
                    return (
                        <div key={room.id}>
                            <h1>{room.name}</h1>
                            <p>{room.description}</p>
                            <p>{room.price}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RoomlistDetail