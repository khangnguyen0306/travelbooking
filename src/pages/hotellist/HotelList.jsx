import React from 'react'
import { useGetroomsQuery } from '../../services/roomAPI'

const HotelList = () => {
    const { data: hoteldata, isLoading } = useGetroomsQuery();
    console.log(hoteldata);
    return (
        <div>
            <h1>Hotel List</h1>
            {isLoading ? <div>Hotels are loading</div> : <div>{hoteldata.map(hotel => <div>{hotel.name}</div>)}</div>}
        </div>
    )
}

export default HotelList