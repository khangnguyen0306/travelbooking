import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Filter.scss"
import { Card, Col, Input, Row, Select, InputNumber, Form, Popover, Button, Alert, notification } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import IMG from '../../../../assets/photo-3-1485152074061.jpg';
import { VietnameseProvinces } from "../../../../utils/utils";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate, Link } from 'react-router-dom';
import { setGuests, setRooms, setDestination, setDate } from '../../../../slices/hotelSearch.slice';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
};

const Filter = () => {
    const [visible, setVisible] = useState(false);
    // const [guests, setGuests] = useState(1);
    // const [rooms, setRooms] = useState(1);
    // const [destination, setDestination] = useState(null);
    // const [date, setDate] = useState(null);
    const dispatch = useDispatch();
    const guests = useSelector((state) => state.hotelSearch.guests);
    const rooms = useSelector((state) => state.hotelSearch.rooms);
    const date = useSelector((state) => state.hotelSearch.date);
    const destination = useSelector((state) => state.hotelSearch.destination);
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
            })
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
    console.log("destination: " + destination);
    console.log("guests: " + guests);
    console.log("rooms: " + rooms);
    console.log("date: " + date);
    const onChange = (e) => {
        console.log(e.target.value);
    };
    const onSubmit = async (data) => {
        console.log("data: " + data);
        try {
            const newData = {
                ...data,
            };
            console.log(newData);
            await mutate(newData).unwrap();
        } catch (err) {
            console.log(err.message);
        }
    };
    const handleDateChange = (dates) => {
        dispatch(setDate(dates));
    };
    const handleDestinationChange = (value) => {
        dispatch(setDestination(value));
    };
    const handleSearchChange = (value) => {
        console.log("push");
    }
    return (
        <Row justify="center" align="middle" className="Home-layout">
            <Col xs={24} md={12}>
                <div className="Card-container-home">
                    <span className="Bagde-card-container-home">Book With Us!</span>
                    <h1 className="title-card-container-home">
                        You're<span style={{ color: '#5c98f2' }}> faraway traveler</span> who doesn't tell me where you want to be taken to. <br />
                    </h1>
                </div>
            </Col>
            <Col xs={24} md={11} style={{ width: '50%', textAlign: "center" }}>
                <img src={IMG} style={{ width: "80%", borderRadius: '30px' }} />
            </Col>

            <div className="search-layout-home">
                <RangePicker
                    className="search-content-container"
                    disabledDate={disabledDate}
                    format={dateFormat}
                    onChange={handleDateChange}
                    placeholder={["Check In", "CheckOut"]}
                />
                <div className="border"></div>
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
                        <Option key={index} value={province}>
                            {province}
                        </Option>
                    ))}
                </Select>
                <div className="border"></div>
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
        </Row >
    )
}

export default Filter