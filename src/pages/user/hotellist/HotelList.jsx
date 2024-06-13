import React, { useState } from 'react';
import { useGetHotelListQuery } from '../../../services/roomAPI';
import { Link } from 'react-router-dom';
import './HotelList.scss';
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { setGuests, setRooms, setDate, setDestination } from '../../../slices/hotelSlice';
import { Col, Row, DatePicker, Space, InputNumber, Checkbox, Select, Rate, Button, notification, Popover } from "antd";
import { VietnameseProvinces } from "../../../utils/utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
};

const HotelList = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const guests = useSelector(state => state.hotel?.search?.guests);
    const rooms = useSelector(state => state.hotel?.search?.rooms);
    const date = useSelector(state => state.hotel?.search?.date);
    const destination = useSelector(state => state.hotel?.search?.destination);
    const { data: hoteldata, isLoading } = useGetHotelListQuery();

    const handleRoomsChange = (value) => {
        dispatch(setRooms(value));
        if (guests > value * 6) {
            dispatch(setGuests(value * 6));
        }
    };

    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fetchMoreData = () => {
        if (currentHotels && currentPage * pageSize >= hoteldata?.length) {
            setHasMore(false);
            return;
        }
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
        });
    };

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

    const handleSearchChange = () => {
        console.log('Search button clicked');
    };

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

    const indexOfLastHotel = currentPage * pageSize;
    const indexOfFirstHotel = indexOfLastHotel - pageSize;
    const currentHotels = hoteldata ? hoteldata.slice(indexOfFirstHotel, indexOfLastHotel) : [];

    return (
        <div className='container-hotel-hotelSearch'>
            <div className='listhotel-filter'>
                <div className="search-layout-hotels">
                    <div className="search-content-container-hotels">
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                value={date ? date.map(d => dayjs(d)) : null}
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
                                <Select.Option key={index} value={province}>
                                    {province}
                                </Select.Option>
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
                            <p><SearchOutlined /></p>
                        </div>
                    </Button>
                </div>
            </div>
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
                                Rating
                                <div className="facilities-check-box">
                                    <div><Checkbox><Rate value={1} disabled /></Checkbox></div>
                                    <div><Checkbox><Rate value={2} disabled /></Checkbox></div>
                                    <div><Checkbox><Rate value={3} disabled /></Checkbox></div>
                                    <div><Checkbox><Rate value={4} disabled /></Checkbox></div>
                                    <div><Checkbox><Rate value={5} disabled /></Checkbox></div>
                                </div>
                            </div>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button className="btn add-to-cart" type="button">
                                    Search Room
                                </Button>
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
                                {currentHotels?.map((hotel) => (
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
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HotelList;
