import { useDispatch } from "react-redux";
import "../scss/RoomList.scss"
import { Link } from 'react-router-dom';
import { setHotelName } from "../../../../../slices/bookingSlice";

const RoomList = ({ roomTypes, hotel_name }) => {
  const dispatch = useDispatch();

  return (
    <div className="rooms-section-wrapper">
      <p className='rooms-section-title'>Room List</p>
      <div className='rooms-list'>
        {roomTypes?.map((roomType, index) => (
          <div key={index} className="room-card">
            <img
              src={roomType?.image_urls?.[0]?.image_url || 'default_image_url_here'}
              alt={roomType?.roomType_name || 'default_roomType_name'}
              className="roomType-img"
            />
            <div className="roomType-info">
              <div className='body-start'>
                <h2 className="roomType-name">{roomType?.room_type_name}</h2>
                <div className='more-info'>
                  <span className='info-item'>Max: {roomType?.capacity_per_room} Guests</span>
                  {Object.entries(roomType?.types?.[0])
                    .filter(([key, value]) => (key !== "id" && value !== false))
                    .map(([key, value]) => (
                      <span key={key} className='info-item'>
                        {key.toUpperCase().slice(0, 1).concat(key.slice(1, key.length))}
                      </span>
                    ))}
                </div>
                <div className='roomType-conveniences'>
                  {roomType?.conveniences && roomType?.conveniences.length > 0 ? (
                    Object.entries(roomType?.conveniences?.[0])
                      .filter(([key, value]) => (key !== "id" && value !== false))
                      .map(([key, value]) => (
                        <span key={key} className='convenience-item'>
                          {key.toUpperCase().slice(0, 1).concat(key.slice(1, key.length))}
                        </span>
                      ))
                  ) : (
                    <p className="no-conveniences">No conveniences available</p>
                  )}
                </div>
              </div>
              <div className='body-end'>
                <div className="price">
                  From <span className='number'>{roomType?.room_price?.toLocaleString()}</span> VND
                </div>
                <Link className="roomType-book-now" to={`/room-details/${roomType?.id}`} onClick={() => {
                  dispatch(setHotelName(hotel_name))
                }}>
                  DETAIL
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
