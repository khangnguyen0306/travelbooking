import React from 'react'
import { useGetHotelsQuery } from '../../services/roomAPI'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const HotelList = () => {
    const { data: hoteldata, isLoading } = useGetHotelsQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!hoteldata || hoteldata.length === 0) {
        return <div>No rooms available</div>;
    }

    return (
        <div style={{ marginTop: '6rem' }}>
            {hoteldata.map((hotel) => (
                <div key={hotel.id}>
                    <p>{hotel.name}</p>
                    <Link to={`/hotel-detail/${hotel.id}`}>
                        <Button>
                            Detail
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default HotelList