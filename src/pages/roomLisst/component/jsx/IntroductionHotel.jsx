import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import "../scss/introduction.scss"
import Map from './Map';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import maylanh from "../../../../assets/iconHotelDetail/maylanh.png";
import nhahang from "../../../../assets/iconHotelDetail/nhahang.png";
import hoboi from "../../../../assets/iconHotelDetail/hoboi.png";
import letan from "../../../../assets/iconHotelDetail/letan.png";
import chodauxe from "../../../../assets/iconHotelDetail/chodauxe.png";
import thangmay from "../../../../assets/iconHotelDetail/thangmay.png";
import wifi from "../../../../assets/iconHotelDetail/wifi.png";



const IntroductionHotel = (
    {
        description,
        amenities,
        address,
        name,
        price
    }) => {

    const amenitiesToDisplay = amenities?.main.slice(0, 10) || [];
    const firstColumn = amenitiesToDisplay.slice(0, 5);
    const secondColumn = amenitiesToDisplay.slice(5, 10);

    const displayAmentites = {
        "conditioner":
            <p className='displayAmentites'>
                <img src={maylanh} className='display-icon-amentites' /> Máy Lạnh
            </p>,
        "restaurant": <p className='displayAmentites'>
            <img src={nhahang} className='display-icon-amentites' /> Nhà hàng
        </p>,
        "pool": <p className='displayAmentites'>
            <img src={hoboi} className='display-icon-amentites' /> Hồ bơi
        </p>,
        "receptionist": <p className='displayAmentites'>
            <img src={letan} className='display-icon-amentites' /> Lễ tân 24h
        </p>,
        "parking": <p className='displayAmentites'>
            <img src={chodauxe} className='display-icon-amentites' /> Chỗ đậu xe
        </p>,
        "elevator": <p className='displayAmentites'>
            <img src={thangmay} className='display-icon-amentites' /> Thang máy
        </p>,
        "wifi": <p className='displayAmentites'>
            <img src={wifi} className='display-icon-amentites' /> WiFi
        </p>
    }

    function limitWords(text, maxWords) {
        const words = text?.split(" ");
        if (words?.length > maxWords) {
            return words?.slice(0, maxWords).join(" ") + "...";
        } else {
            return text;
        }
    }

    return (
        <Row gutter={[16, 16]} style={{ width: '100%', height: 'fit-content' }} justify={'center'} className='introduction-hotel-layout'>
            <Col xs={24} md={6}>
                <div className="card-column">

                    <div className="card-container">
                        <div className="card-header" >
                            <p>Giới thiệu cơ sở lưu trú </p>
                            <Link to={"/"}>
                                <p>Xem thêm <RightOutlined /> </p>
                            </Link>
                        </div>
                        <p>{limitWords(description, 50)}</p>
                    </div>

                    <div className="card-container">
                        <div className="card-header" >
                            <p>Giới thiệu cơ sở lưu trú </p>
                            <Link to={"/"}>
                                <p>Xem thêm <RightOutlined /> </p>
                            </Link>
                        </div>
                        <div style={{ display: 'flex' }}>

                            <div style={{ flex: 1 }}>
                                {firstColumn.map((amenitie, index) => (
                                    <div key={index}>
                                        <p>{displayAmentites[amenitie]}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ flex: 1 }}>
                                {secondColumn.map((amenitie, index) => (
                                    <div key={index}>
                                        <p>{displayAmentites[amenitie]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={24} md={10}>
                <Map
                    items={address}
                    name={name}
                    price={price}
                />
            </Col>

        </Row>


    )
}

export default IntroductionHotel