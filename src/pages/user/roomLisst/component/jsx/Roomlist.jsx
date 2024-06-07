import React, { useState } from 'react';
import { useGetRoomQuery } from '../../../../../services/roomAPI';
import "../scss/roomlist.scss"
import { Rate, Row, Checkbox, Tooltip } from 'antd';
import { QuestionCircleFilled, RightOutlined, SafetyCertificateFilled } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
const RoomList = ({ hotelId }) => {
  const [filter, setFilter] = useState('');
  const [breakFastFilter, setBreakFastFilter] = useState(false);
  const [freeToOutFilter, setFreeToOutFilter] = useState(false);
  const [bedTypeFilter, setBedTypeFilter] = useState(false);

  const { data: roomList, isLoading } = useGetRoomQuery(hotelId);
  console.log(roomList);

  const filteredRooms = roomList?.filter(room => {
    const matchRoomType = room.roomType.toLowerCase().includes(filter.toLowerCase());
    const matchBreakFast = breakFastFilter ? room.breakFast : true;
    const matchFreeToOut = freeToOutFilter ? room.freeToOut : true;
    const matchBedType = bedTypeFilter ? room.bedtype === 'normal' : true;

    return matchRoomType && matchBreakFast && matchFreeToOut && matchBedType;
  });

  return (
    <Row gutter={[16, 16]} style={{ width: '100%', height: 'fit-content', backgroundColor: '#fff' }} justify={'center'}>
      <div className="room-list-hotel-page">
        <div className='room-list-hotel-title'>
          <p>Room List</p>

        </div>
        <div className="toggle-roomlist" >
          <p><SafetyCertificateFilled style={{ color: 'green', fontSize: '20px', marginRight: '0.5rem' }} /></p>
          <p>  Phải đặt phòng trong thời điểm không chắc chắn này? Hãy chọn phòng có thể hủy miễn phí!</p>
        </div>
        <div className="filter-options-layout-room-list">
          <p>Tìm kiếm nhanh hơn bằng cách chọn những tiện nghi bạn cần</p>
          <div className="filter-options-roomlist">
            <div>
              <Search placeholder="Search by room type"
                onSearch={(value) => setFilter(value)}
                enterButton
              />
            </div>
            <Checkbox
              checked={breakFastFilter}
              onChange={(e) => setBreakFastFilter(e.target.checked)}
            >
              Breakfast Included
            </Checkbox>
            <Checkbox
              checked={freeToOutFilter}
              onChange={(e) => setFreeToOutFilter(e.target.checked)}
            >
              Free to Go Out
              <Tooltip title={<p>Bạn có thể hủy phòng mà không mất phí.</p>}>
                <span><QuestionCircleFilled style={{ color: '#5c98f2', marginLeft: '10px' }} /></span>
              </Tooltip>

            </Checkbox>
            <Checkbox
              checked={bedTypeFilter}
              onChange={(e) => setBedTypeFilter(e.target.checked)}
            >
              Normal Bed Type
              <Tooltip title={<p>Giường lớn có thể bao gồm giường đôi/queen/King phù hợp cho 2 người lớn.</p>}>
                <span><QuestionCircleFilled style={{ color: '#5c98f2', marginLeft: '10px' }} /></span>
              </Tooltip>
            </Checkbox>
          </div>
        </div>
        {filteredRooms?.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-image" style={{ height: '100%' }}>
              {room.avatar.length > 0 ? (
                <img src={room.avatar[0]} alt={room.roomType} width={"372px"} height={"100%"} />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>
            <div className="room-info">
              <h3 className='room-type'>{room.roomType}</h3>
              <p className='room-desc'> {room.description}</p>
              <Rate allowHalf value={room.rate} style={{ marginBottom: '18px', fontSize: '15px' }} />
              <div className="price-btn-book">
                <div>
                  <Link to={`/room-details/${room?.id}`}><button className='btn-book-now'>BOOK NOW <RightOutlined /></button></Link>
                </div>
                <p className='price'> {room.price} VND</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Row >
  );
};

export default RoomList;
