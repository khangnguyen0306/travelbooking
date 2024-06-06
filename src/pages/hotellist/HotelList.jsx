import React, { useState } from 'react'
import { useGetHotelListQuery } from '../../services/roomAPI'
import { TinyColor } from '@ctrl/tinycolor';
import { Link } from 'react-router-dom';
import './HotelList.scss'
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { setGuests, setRooms, setDate, setDestination } from '../../slices/hotelSearch.slice';
import { Col, Row, DatePicker, Space, InputNumber, Checkbox, Button, Pagination, Rate, Select, notification, Popover } from "antd";
import { VietnameseProvinces } from "../../utils/utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
};
const HotelList = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const guests = useSelector(state => state.hotelSearch.guests);
    const rooms = useSelector(state => state.hotelSearch.rooms);
    const date = useSelector(state => state.hotelSearch.date);
    const destination = useSelector(state => state.hotelSearch.destination);
    const { data: hoteldata, isLoading } = useGetHotelListQuery();
    console.log(hoteldata);
    const handleRoomsChange = (value) => {
        dispatch(setRooms(value));
        if (guests > value * 6) {
            dispatch(setGuests(value * 6));
        }
    };
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        if (currentHotels && currentPage * pageSize >= currentHotels?.length) {
            setHasMore(false);
            return;
        }
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const handlePageChange = (page) => {

        setCurrentPage(page);
        window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
        });
    };
    const indexOfLastHotel = currentPage * pageSize;
    const indexOfFirstHotel = indexOfLastHotel - pageSize;
    const currentHotels = hoteldata?.slice(indexOfFirstHotel, indexOfLastHotel);

    const handleGuestsChange = (value) => {
        if (value > rooms * 6) {
            notification.warning({
                message: "Warning!",
                description: "Mỗi phòng tối đa 6 người."
            });
            dispatch(setGuests(rooms * 6));
        } else {
            dispatch(setGuests(value));
        }
    };
    const handleDateChange = (dates) => {
        dispatch(setDate(dates));
    };
    const handleDestinationChange = (value) => {
        dispatch(setDestination(value));
    };
    const handleSearchChange = (value) => {
        console.log('Search button clicked');
    }
    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };
    const content = (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <span>Guests</span>
                </Col>
                <Col span={12}>
                    <InputNumber min={1} max={10} value={guests} onChange={handleGuestsChange} />
                </Col>
                <Col span={12}>
                    <span>Rooms</span>
                </Col>
                <Col span={12}>
                    <InputNumber min={1} max={10} value={rooms} onChange={handleRoomsChange} />
                </Col>
            </Row>

        </div>
    );

    console.log("destination: " + destination);
    console.log("guests: " + guests);
    console.log("rooms: " + rooms);
    console.log("date: " + date);
    const hotels = [
        {
            id: 1,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x400/?hotel,room',
        },
        {
            id: 2,
            name: 'Standard Deluxe',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 4.5,
            reviews: 1,
            originalPrice: 90,
            discountPrice: 75,
            imgUrl: 'https://source.unsplash.com/600x401/?hotel,room',
            discount: '17% OFF'
        },
        {
            id: 3,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 4,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x402/?hotel,room',
        }, {
            id: 4,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            originalPrice: 90,
            discountPrice: 75,
            imgUrl: 'https://source.unsplash.com/600x403/?hotel,room',
            discount: '17% OFF'
        }, {
            id: 5,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x404/?hotel,room',
        }, {
            id: 6,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x405/?hotel,room',
            discount: '17% OFF'
        }, {
            id: 7,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x406/?hotel,room',
        },
    ];
    return (
        <div className='container-hotel-hotelSearch'>
            <div className='listhotel-filter'>
                <div className="search-layout-hotels">
                    <div className="search-content-container-hotels">
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                value={date}
                                disabledDate={disabledDate}
                                format={dateFormat}
                                onChange={handleDateChange}
                                placeholder={["Check In", "CheckOut"]}
                            />
                        </Space>
                    </div>
                    <div className="search-content-container-hotels">
                        <Select
                            value={destination}
                            onChange={handleDestinationChange}
                            showSearch
                            style={{
                                width: 286,
                                border: 'none',
                                color: '#8c8c8c',
                                fontSize: '16px'
                            }}
                            placeholder="Location"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.children ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.localeCompare(optionB.children)}
                        >
                            {VietnameseProvinces.map((province, index) => (
                                <Option key={index} value={province}>
                                    {province}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="search-content-container-hotels">

                        <Popover
                            content={content}
                            title="Select Guests and Rooms"
                            trigger="click"
                            open={visible}
                            onOpenChange={handleVisibleChange}
                        >
                            <Button className='button-guest' >
                                {guests} Guests, {rooms} Room(s) <UserOutlined />
                            </Button>
                        </Popover>
                    </div>
                    <Button type="text" onClick={handleSearchChange} className="search-layout-hotels-btn">
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            <p ><SearchOutlined /></p>
                        </div>
                    </Button>
                </div>
            </div>

            <h1 className='titel'>Hotels</h1>
            <div className="hotel">
                <Row>
                    <Col xs={24} md={6}>
                        <div className="filter">


                            <div className='facilities'>
                                Facilities
                                <div className="facilities-check-box">
                                    <div><Checkbox>Air Conditioner</Checkbox></div>
                                    <div><Checkbox>Free Wifi</Checkbox></div>
                                    <div><Checkbox>Free Breakfast</Checkbox></div>
                                    <div><Checkbox>Free Parking</Checkbox></div>
                                    <div><Checkbox>Heater</Checkbox></div>
                                </div>
                            </div>
                            <div className='facilities'>
                                Room Size
                                <div className="facilities-check-box">
                                    <div><Checkbox>30-40 sqmr</Checkbox></div>
                                    <div><Checkbox>40-55 sqm</Checkbox></div>
                                    <div><Checkbox>55-80 sqm</Checkbox></div>
                                    <div><Checkbox>80+ sqm</Checkbox></div>
                                </div>
                            </div>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <button
                                    className="btn add-to-cart"
                                    type="button"
                                >
                                    Search Room
                                </button>

                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={18}>
                        <div className="list-hotel">
                            <InfiniteScroll
                                dataLength={currentHotels?.length || 0}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<h3>Loading...</h3>}
                                scrollableTarget="scrollableDiv"
                                endMessage={<h3 style={{ textAlign: 'center' }}>Hết dữ liệu</h3>}
                            >
                                {hoteldata?.map((hotel) => (
                                    <div key={hotel?.id} className="hotel-item">
                                        {hotel?.discount && <div className="hotel-discount">{hotel?.discount}</div>}
                                        <img src={hotel?.imgUrl} alt={hotel?.name} className="hotel-img" />
                                        <div className="hotel-info">
                                            <h2 className="hotel-name">{hotel?.name}</h2>
                                            <p className="hotel-description">{hotel?.description}</p>
                                            <div className="hotel-rating">
                                                <Rate allowHalf value={hotel?.rating} disabled />
                                                <span>({hotel?.reviews} Review{hotel?.reviews > 1 && 's'})</span>
                                            </div>
                                            <Row>
                                                <Col xs={24} md={14}>
                                                    <Link to={`/hotel-detail/${hotel?.id}`}>
                                                        <div className="hotel-book-now">DETAIL</div>
                                                    </Link>
                                                </Col>
                                                <Col xs={24} md={10}>
                                                    <div className="hotel-price">
                                                        From <span className="hotel-original-price">{hotel?.originalPrice && <del>${hotel?.originalPrice}</del>}</span> <span className="hotel-current-price"><ins>${hotel?.price ? hotel?.price : hotel?.discountPrice}</ins></span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                ))}
                            </InfiniteScroll>

                        </div>
                        {/* <div className="pagination-container">
                            <Pagination
                                defaultCurrent={1}
                                total={hoteldata?.length}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                            />
                        </div> */}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HotelList