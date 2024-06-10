import React from 'react';
import { Row, Col, Card } from 'antd';
import '../scss/HotelAbout.scss';
import { ExclamationCircleFilled } from '@ant-design/icons';

const amenitiesData = {
    mainAmentites: [
        "Conditioner",
        "Restaurant",
        "Pool",
        "Receptionist",
        "Parking",
        "Elevator",
    ],
    comfortableRoom: [
        "Desk",
        "Hairdryer",
        "Minibar",
        "Shower room",
        "television",
    ],
    nearbyAmenities: [
        "ATM",
        "Beauty salon",
        "Gift store",
        "Grocery store",
        "Hair salon",
        "Laundry",
        "Shop",
        "Supermarket"
    ],
    hotelService: [
        "Reception",
        "Laundry service",
        "Luggage storage",
        "Tour booking support service",
        "24h reception"
    ],
    transport: [
        "Airport pick up",
        "Bicycle rental service",
        "Car rental",
        "Parking"
    ]
};

const splitAmenities = (amenities) => {
    const keys = Object.keys(amenities);
    const mid = Math.ceil(keys.length / 2);
    const firstColumnKeys = keys.slice(0, mid);
    const secondColumnKeys = keys.slice(mid);

    const firstColumn = firstColumnKeys.map(key => ({
        title: key,
        items: amenities[key]
    }));

    const secondColumn = secondColumnKeys.map(key => ({
        title: key,
        items: amenities[key]
    }));

    return [firstColumn, secondColumn];
};

const Amentites = () => {
    const [firstColumn, secondColumn] = splitAmenities(amenitiesData);

    return (
        <>
            <p className='about-hotel-title ' style={{ textAlign: 'center', marginBottom: '2rem' }}>Amentites</p>

            <Row gutter={[16, 16]} style={{ width: '100%', height: 'fit-content' }} justify={'center'}>
                <Col xs={24} md={8}>
                    {firstColumn.map((amenityGroup, index) => (
                        <Card key={index} title={amenityGroup.title} className="amenities-card">
                            <ul>
                                {amenityGroup.items.map((item, idx) => (
                                    <li key={idx} style={{ marginLeft: '1rem' }}>{item}</li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </Col>
                <Col xs={24} md={8}>
                    {secondColumn.map((amenityGroup, index) => (
                        <Card key={index} title={amenityGroup.title} className="amenities-card">
                            <ul>
                                {amenityGroup.items.map((item, idx) => (
                                    <li style={{ marginLeft: '1rem' }} key={idx}>{item}</li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </Col>
                <div className="exclammation-footer" >
                    <div style={{ display: 'flex', alignItems: 'center', color: '#5c98f2' }}>
                        <p style={{ fontSize: '1.3rem',marginRight:'1 rem' }}><ExclamationCircleFilled /></p>
                        <p style={{fontSize:'1rem'}}><strong>Miễn trừ trách nhiệm</strong></p>
                    </div>

                    <p style={{fontSize:'0.9rem',marginTop:'0.5rem'}}><strong>Miễn trừ trách nhiệm:</strong> Khách sạn có trách nhiệm bảo đảm tính chính xác của tất cả các hình ảnh thể hiện.
                        Tabi không chịu trách nhiệm đối với bất kỳ sai lệch nào về mặt hình ảnh.</p>
                </div>
            </Row>
        </>
    );
};

export default Amentites;
