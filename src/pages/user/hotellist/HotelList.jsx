import React, { useState, useEffect } from 'react';
import { useGetHotelWithPageQuery } from '../../../services/hotelAPI';
import { Link } from 'react-router-dom';
import './HotelList.scss';
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { setGuests, setRooms, setDate, setDestination } from '../../../slices/hotelSlice';
import { Col, Row, DatePicker, Space, InputNumber, Checkbox, Select, Rate, Button, notification, Popover, Pagination } from "antd";
import { VietnameseProvinces } from "../../../utils/utils";
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

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);

    const { data, error, isLoading } = useGetHotelWithPageQuery({ pageNumber: currentPage, pageSize });

    useEffect(() => {
        if (data) {
            console.log("Fetched data:", data);
        }
        if (error) {
            console.error("Error fetching hotel data:", error);
        }
    }, [data, error]);

    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
        window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleRoomsChange = (value) => {
        dispatch(setRooms(value));
        if (guests > value * 6) {
            dispatch(setGuests(value * 6));
        }
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
        setCurrentPage(0); // Reset to first page on search
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
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>Error: {error.message}</div>
                            ) : data?.data?.content.length > 0 ? (
                                <>
                                    {data.data.content.map((hotel) => (
                                        <div key={hotel?.id} className="hotel-item">
                                            {hotel?.discount && <div className="hotel-discount">{hotel?.discount}</div>}
                                            <img src={hotel?.imgUrl} alt={hotel?.hotel_name} className="hotel-img" />
                                            <div className="hotel-info">
                                                <h2 className="hotel-name">{hotel?.hotel_name}</h2>
                                                <p className="hotel-description">{hotel?.description}</p>
                                                <div className='hotel-conveniences'>
                                                    {hotel?.conveniences && hotel?.conveniences.length > 0 ? (
                                                        hotel?.conveniences.map((convenience, index) => {
                                                            const trueConveniences = [];
                                                            if (convenience.bar) trueConveniences.push("Bar");
                                                            if (convenience.free_breakfast) trueConveniences.push("Breakfast");
                                                            if (convenience.free_internet) trueConveniences.push("Internet");
                                                            if (convenience.laundry) trueConveniences.push("Laundry");
                                                            if (convenience.pick_up_drop_off) trueConveniences.push("Pick-Up/Drop-Off");
                                                            if (convenience.pool) trueConveniences.push("Pool");
                                                            if (convenience.reception_24h) trueConveniences.push("24h Reception");
                                                            if (convenience.restaurant) trueConveniences.push("Restaurant");
                                                            return (
                                                                <div key={index} className="convenience-list">
                                                                    {trueConveniences.map((item, idx) => (
                                                                        <span key={idx} className="convenience-item">{item}{idx < trueConveniences.length - 1 ? ', ' : ''}</span>
                                                                    ))}
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p className="no-conveniences">No conveniences available</p>
                                                    )}
                                                </div>
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
                                    <Pagination
                                        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
                                        current={currentPage + 1}
                                        total={data?.data?.totalElements}
                                        pageSize={pageSize}
                                        onChange={handlePageChange}
                                        showTotal={(total) => `Total ${total} items`}
                                    />
                                </>
                            ) : (
                                <div className="no-data">No hotels found</div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HotelList;
