import { useEffect } from "react";
import "./RoomDetailsPage.scss";
import { Rate, Avatar, FloatButton, Spin } from "antd";
import { UserOutlined } from '@ant-design/icons';
import BookingForm from "./Components/BookingForm";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRoomDetailQuery } from "../../../services/roomAPI";
import Carousel from "./Components/Carousel";
import { icons } from '../../../utils/icons';

function RoomDetailsPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetRoomDetailQuery(params.roomId);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <div className="wrapper-room-detail-page">
            <Spin spinning={isLoading}>
                <div className="container">
                    <div className="heading">
                        <h1 className="name">{data?.data?.room_type_name}</h1>
                        {/* <div className="feedback">
                            <Rate className="rate" value={5} />
                            <span className="review">(1 review)</span>
                        </div> */}
                    </div>
                    <div className="overview">
                        <span className="item">Max: {data?.data?.capacity_per_room} Guests</span>
                        {Object.entries(data?.data?.types?.[0] || {})
                            .filter(([key, value]) => (key !== "id" && value !== false))
                            .map(([key, value]) => (
                                <span key={key} className='item'>
                                    {key.toUpperCase().slice(0, 1).concat(key.slice(1, key.length))}
                                </span>
                            ))}
                    </div>
                    <Carousel images={data?.data?.image_urls} />
                    <div className="info">
                        <div className="details">
                            <div className="price">
                                <h3 className="from">From {data?.data?.room_price?.toLocaleString()} VND</h3>
                                <span className="per">per night</span>
                            </div>
                            <div className="description">
                                {data?.data?.description}
                            </div>
                            <div className="amenities">
                                <div className="section">
                                    <h3 className="title">Room Amenities</h3>
                                    <div className="list">
                                        {Object.entries(data?.data?.conveniences?.[0] || {})
                                            .filter(([key, value]) => (key !== "id" && value !== false))
                                            .map(([key, value]) => (
                                                <span key={key} className='item'>
                                                    {icons[key]()}
                                                    {key.toUpperCase().slice(0, 1).concat(key.slice(1, key.length))}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="booking">
                            <BookingForm data={data?.data} />
                        </div>
                    </div>
                    <div className="more-rooms">
                        <h3 className="title">Don't feel satisfied!</h3>
                        <p className="description">There are still many other options waiting for you. There are countless other hotels and accommodations available.</p>
                        <button className="see-more" onClick={() => { navigate(-1) }}>Let's see more rooms.</button>
                    </div>
                    {/* <div className="feedback">
                        <div className="total">
                            <div className="review">
                                <span className="count">2 Reviews</span>
                                <Rate className="rate" value={5} disabled />
                            </div>
                            <div className="sort">
                                <span className="title">Sort By:</span>
                                <button className="btn">Rating</button>
                                <button className="btn">Date</button>
                            </div>
                        </div>
                        <div className="list">
                            <div className="item">
                                <div className="user">
                                    <Avatar className="avatar" size={90} icon={<UserOutlined />} />
                                    <span className="name">Jane Smith</span>
                                </div>
                                <div className="review">
                                    <p className="content">Nice room!</p>
                                    <Rate className="rate" value={5} disabled />
                                    <p className="date">August 9, 2022</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="user">
                                    <Avatar className="avatar" size={90} icon={<UserOutlined />} />
                                    <span className="name">Jane Smith</span>
                                </div>
                                <div className="review">
                                    <p className="content">Nice room!</p>
                                    <Rate className="rate" value={5} disabled />
                                    <p className="date">August 9, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </Spin>
            <FloatButton.BackTop visibilityHeight={1000} />
        </div >
    );
}

export default RoomDetailsPage;