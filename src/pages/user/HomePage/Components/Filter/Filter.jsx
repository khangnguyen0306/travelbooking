import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Filter.scss";
import { Col, Row, Select, InputNumber, Popover, Button, notification } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import IMG from '../../../../../assets/photo-3-1485152074061.jpg';
import { VietnameseProvinces } from "../../../../../utils/utils";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Link } from 'react-router-dom';
import { setGuests, setRooms, setDestination, setDate } from '../../../../../slices/bookingSlice';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
};

const Filter = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const guests = useSelector((state) => state.hotel.search.guests);
    const rooms = useSelector((state) => state.hotel.search.rooms);
    const date = useSelector((state) => state.hotel.search.date);
    const destination = useSelector((state) => state.hotel.search.destination);

    // Calculate default dates for tomorrow and the day after
    const defaultStartDate = dayjs().add(1, 'day');
    const defaultEndDate = dayjs().add(2, 'day');
    const defaultDates = [defaultStartDate, defaultEndDate];

    // Convert the date strings back to dayjs objects
    const dateObjects = date.length ? date.map(dateString => dayjs(dateString, dateFormat)) : defaultDates;

    useEffect(() => {
        const defaultDates = [defaultStartDate.format(dateFormat), defaultEndDate.format(dateFormat)];
        dispatch(setDate(defaultDates));
        localStorage.setItem('hotelDates', JSON.stringify(defaultDates));
    }, [dispatch]);


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


    const handleDateChange = (dates) => {
        if (dates) {
            const formattedDates = dates.map(date => date.format(dateFormat));
            dispatch(setDate(formattedDates));
            localStorage.setItem('hotelDates', JSON.stringify(formattedDates));
        } else {
            dispatch(setDate([]));
            localStorage.removeItem('hotelDates');
        }
    };
    const handleDestinationChange = (value) => {
        dispatch(setDestination(value));
    };

    const handleSearchChange = () => {
        console.log("Search button clicked");
    };

    return (
        <Row justify="center" align="middle" className="Home-layout">
            <Col xs={24} md={12} className="Card-container-home">
                <span className="Bagde-card-container-home">Book With Us!</span>
                <h1 className="title-card-container-home">
                    You're<span> faraway traveler</span> who doesn't tell me where you want to be taken to. <br />
                </h1>
            </Col>
            <Col xs={24} md={11} className="Card-container-img">
                <img src={IMG} />
            </Col>
            <div className="search-layout-home">
                <RangePicker
                    className="search-content-container"
                    disabledDate={disabledDate}
                    format={dateFormat}
                    onChange={handleDateChange}
                    value={dateObjects.length ? dateObjects : null} // Use the dateObjects array here
                    placeholder={["Check In", "Check Out"]}
                />
                <Select
                    className="search-content-container"
                    onChange={handleDestinationChange}
                    showSearch
                    variant="borderless"
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
                    <Button className="search-content-container">
                        {guests} Guests, {rooms} Room(s) <UserOutlined />
                    </Button>
                </Popover>
                <Button onClick={handleSearchChange} className="search-layout-home-btn">
                    <Link to={`/view-hotels`}><SearchOutlined /></Link>
                </Button>
            </div>
        </Row>
    );
};

export default Filter;
