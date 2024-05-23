import React, { useState } from 'react';
import { useGetRoomQuery } from '../../../../services/roomAPI';


const RoomList = ({ hotelId }) => {

  const [filter, setFilter] = useState('');
  const { data: roomList, isLoading } = useGetRoomQuery(hotelId);
  console.log(roomList);
  // console.log(hotelId);

  const filteredRooms = roomList?.filter(room =>
    room.roomType.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <header>
        <input
          type="text"
          placeholder="Filter by room type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </header>
      <div className="room-list">
        {filteredRooms?.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-image">
              {room.avatar.length > 0 ? (
                <img src={room.avatar[0]} alt={room.roomType} />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>
            <div className="room-info">
              <h3>{room.roomType}</h3>
              <p><strong>Rate:</strong> {room.rate}</p>
              <p><strong>Bed Number:</strong> {room.bedNumber}</p>
              <p><strong>People Number:</strong> {room.peopleNumber}</p>
              <p><strong>Square:</strong> {room.square}</p>
              <p><strong>View:</strong> {room.view}</p>
              <p><strong>Price:</strong> ${room.price}</p>
              <p><strong>Description:</strong> {room.description}</p>
              <p><strong>Breakfast:</strong> {room.breakFast ? 'Included' : 'Not Included'}</p>
              <p><strong>Free to Go Out:</strong> {room.freeToOut ? 'Yes' : 'No'}</p>
              <div className="room-buttons">
                <button onClick={() => alert(`Viewing details for ${room.roomType}`)}>View Details</button>
                <button onClick={() => alert(`Booking ${room.roomType}`)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
