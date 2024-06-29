import React, { useState, useEffect } from 'react';
import { useGetHotelWithPageQuery, usePostFilterHotelMutation } from '../../../services/hotelAPI';
import { Form, Link } from 'react-router-dom';
import './HotelList.scss';
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { setGuests, setRooms, setDate, setDestination } from '../../../slices/bookingSlice';
import { Col, Row, DatePicker, InputNumber, Checkbox, Select, Rate, Button, notification, Popover, Pagination, Spin } from "antd";
import { VietnameseProvinces } from "../../../utils/utils";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const storageFormat = 'YYYY-MM-DD';
const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
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
    const [filters, setFilters] = useState({});
    const { data, error, isLoading } = useGetHotelWithPageQuery({ pageNumber: currentPage, pageSize });
    const [filterOptions, { isLoading: isFiltering }] = usePostFilterHotelMutation();
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    useEffect(() => {
        if (data) {
            // console.log("Fetched data:", data);
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

    const handleFilter = async () => {
        const facilitiesMapping = {
            freeBreakfast: null,
            pickUpDropOff: null,
            restaurant: null,
            bar: null,
            pool: null,
            freeInternet: null,
            reception24h: null,
            laundry: null
        };

        selectedFacilities.forEach(facility => {
            facilitiesMapping[facility] = "true";
        });

        const body = {
            rating: selectedRatings.length > 0 ? selectedRatings[selectedRatings.length - 1].toString() : null,
            freeBreakfast: facilitiesMapping.freeBreakfast,
            pickUpDropOff: facilitiesMapping.pickUpDropOff,
            restaurant: facilitiesMapping.restaurant,
            bar: facilitiesMapping.bar,
            pool: facilitiesMapping.pool,
            freeInternet: facilitiesMapping.freeInternet,
            reception24h: facilitiesMapping.reception24h,
            laundry: facilitiesMapping.laundry,
            page: currentPage,
            size: pageSize
        };

        try {
            const response = await filterOptions(body).unwrap();
            console.log("Filtering with:", body, "Response:", response);
            setFilters(response);
        } catch (error) {
            console.error("Error filtering hotels:", error);
            setFilters({ data: { content: [] } });

        }
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
        if (dates) {
            const formattedDates = dates.map(date => date.format(storageFormat));
            dispatch(setDate(formattedDates));
        } else {
            dispatch(setDate([]));
        }
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

    // Calculate default dates for tomorrow and the day after
    const defaultStartDate = dayjs().add(1, 'day');
    const defaultEndDate = dayjs().add(2, 'day');
    const defaultDates = [defaultStartDate, defaultEndDate];

    // Convert the date strings back to dayjs objects
    const dateObjects = date?.length ? date.map(dateString => dayjs(dateString, storageFormat).format(dateFormat)) : defaultDates;

    useEffect(() => {
        const defaultDates = [defaultStartDate?.format(storageFormat), defaultEndDate?.format(storageFormat)];
        dispatch(setDate(defaultDates));
    }, [dispatch]);

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

    const handleFacilityChange = (checkedValues) => {
        setSelectedFacilities(checkedValues);
    };

    const handleRatingChange = (checkedValues) => {
        setSelectedRatings(checkedValues);
    };
    const filterUpdate = filters?.data?.content;
    console.log("Filters:", filterUpdate);

    return (
        <div className='container-hotel-hotelSearch'>
            <div className="search-layout-hotels">
                <div className='body'>
                    <RangePicker
                        className='item'
                        value={dateObjects.length ? dateObjects.map(date => dayjs(date, dateFormat)) : null} // Use the dateObjects array here
                        disabledDate={disabledDate}
                        format={dateFormat}
                        onChange={handleDateChange}
                        placeholder={["Check In", "Check Out"]}
                    />
                    <Select
                        className='item'
                        value={destination}
                        onChange={handleDestinationChange}
                        showSearch
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
                    <Popover
                        content={content}
                        title="Select Guests and Rooms"
                        trigger="click"
                        open={visible}
                        onOpenChange={handleVisibleChange}
                    >
                        <Button className='item button-guest' >
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
            <div className="hotel">
                <Form className="filter">
                    <div className='facilities'>
                        Facilities
                        <Checkbox.Group className="facilities-check-box" onChange={handleFacilityChange}>
                            <div><Checkbox value="freeBreakfast">Free Breakfast</Checkbox></div>
                            <div><Checkbox value="pickUpDropOff">Pick Up Drop Off</Checkbox></div>
                            <div><Checkbox value="restaurant">Restaurant</Checkbox></div>
                            <div><Checkbox value="bar">Bar</Checkbox></div>
                            <div><Checkbox value="pool">Pool</Checkbox></div>
                            <div><Checkbox value="freeInternet">Free Internet</Checkbox></div>
                            <div><Checkbox value="reception24h">Reception 24h</Checkbox></div>
                            <div><Checkbox value="laundry">Laundry</Checkbox></div>
                        </Checkbox.Group>
                    </div>
                    <div className='facilities'>
                        Rating
                        <Checkbox.Group className="facilities-check-box" onChange={handleRatingChange}>
                            <div><Checkbox value={1}><Rate value={1} disabled /></Checkbox></div>
                            <div><Checkbox value={2}><Rate value={2} disabled /></Checkbox></div>
                            <div><Checkbox value={3}><Rate value={3} disabled /></Checkbox></div>
                            <div><Checkbox value={4}><Rate value={4} disabled /></Checkbox></div>
                            <div><Checkbox value={5}><Rate value={5} disabled /></Checkbox></div>
                        </Checkbox.Group>
                    </div>
                    <Button className="btn" type="button" onClick={handleFilter}>
                        Search Room
                    </Button>
                </Form>
                <div className="list-hotel">
                    <Spin spinning={isLoading || isFiltering}>
                        {filters?.data?.content?.length > 0 ? (
                            <>
                                {filterUpdate.map((hotel) => (
                                    <div key={hotel?.id} className="hotel-item">
                                        {hotel?.discount && <div className="hotel-discount">{hotel?.discount}</div>}
                                        <img
                                            src={hotel?.image_urls?.[0]?.url || 'default_image_url.jpg'}
                                            alt={hotel?.hotel_name || 'Default Hotel Name'}
                                            className="hotel-img"
                                        />
                                        <div className="hotel-info">
                                            <div className='body-start'>
                                                <h2 className="hotel-name">{hotel?.hotel_name}</h2>
                                                <div className="hotel-rating">
                                                    <Rate allowHalf value={hotel?.rating} disabled />
                                                </div>
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
                                                                <React.Fragment key={index}>
                                                                    {trueConveniences.map((item, idx) => (
                                                                        <span key={`${index}-${idx}`} className="convenience-item">
                                                                            {item}{idx < trueConveniences.length - 1 ? ', ' : ''}
                                                                        </span>
                                                                    ))}
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    ) : (
                                                        <p className="no-conveniences">No conveniences available</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='body-end'>
                                                <div className="infomation">
                                                    Click on details to see more information.
                                                </div>
                                                <Link className="hotel-book-now" to={`/hotel-detail/${hotel?.id}`}>
                                                    DETAIL
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Pagination
                                    className='pagination-container'
                                    current={currentPage + 1}
                                    total={filters?.data?.totalElements}
                                    pageSize={pageSize}
                                    onChange={handlePageChange}
                                    showTotal={(total) => `Total ${total} items`}
                                />
                            </>
                        ) : (
                            <div className="no-data">No hotels found</div>
                        )}
                    </Spin>
                </div>

            </div>
        </div>
    );
};

export default HotelList;
