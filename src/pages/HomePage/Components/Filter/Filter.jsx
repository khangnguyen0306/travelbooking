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
import { setGuests, setRooms, setDestination, setDate } from '../../../../slices/hotelSearch.slice';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const disabledDate = (current) => {
    // Can not select days before today and today
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
        if (guests > value * 2) {
            dispatch(setGuests(value * 2));
        }
    };

    const handleGuestsChange = (value) => {
        if (value > rooms * 2) {
            notification.warning({
                message: "Warning!",
                description: "Mỗi phòng tối đa 2 người."
            })
            dispatch(setGuests(rooms * 2));
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
    return (
        <Row justify="center" align="middle" className="Home-layout">
            <Col xs={24} md={12}>
                <Card style={{ height: "100%" }} className="Card-container-home">
                    <div className="Bagde-card-container-home">
                        <p>Book With Us!</p>
                    </div>
                    <h1 className="title-card-container-home">Find Next Place
                        To <span style={{ color: '#5c98f2' }}>Visit</span></h1>
                    <div className="content-card-container-home">
                        <p >Discover amzaing places at exclusive deals.</p>
                        <p>
                            Eat, Shop, Visit interesting places around the world.</p>
                    </div>
                </Card>
            </Col>
            <Col xs={24} md={11}>
                <img src={IMG} style={{ width: '505px', height: '680px', marginTop: '6rem', borderRadius: '30px' }} />
            </Col>

            <div className="search-layout-home">
                <div className="search-content-container">
                    <label className="search-content-container-label" style={{ fontFamily: 'DM Sans, sans-serif' }}>Check In/Check Out</label>

                    <Space direction="vertical" size={12}>

                        <RangePicker disabledDate={disabledDate} format={dateFormat} onChange={handleDateChange} />
                    </Space>
                </div>
                <div className="search-content-container">
                    <label className="search-content-container-label">Location</label>
                    <Select
                        onChange={handleDestinationChange}
                        showSearch
                        style={{
                            width: 200,
                            border: 'none',
                            color: '#8c8c8c',
                            fontSize: '16px'
                        }}
                        placeholder="Select a province"
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
                <div className="search-content-container">
                    <label className="search-content-container-label">Guest and Room</label>

                    <Popover
                        content={content}
                        title="Select Guests and Rooms"
                        trigger="click"
                        open={visible}
                        onOpenChange={handleVisibleChange}
                    >
                        <Button>
                            {guests} Guests, {rooms} Room(s) <UserOutlined />
                        </Button>
                    </Popover>
                </div>
                <div className="search-layout-home-btn">
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                        <p><SearchOutlined /></p>
                        <p>Search now</p>
                    </div>
                </div>
            </div>
        </Row>
    )
}

export default Filter