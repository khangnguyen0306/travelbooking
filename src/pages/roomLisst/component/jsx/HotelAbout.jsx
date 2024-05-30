import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'antd';
import '../scss/HotelAbout.scss';

const hotelImages = [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D'
];
const description = `
Welcome to our luxurious hotel! Our hotel offers the best services and facilities
to ensure you have a comfortable and enjoyable stay. From our beautifully designed
rooms to our state-of-the-art amenities, we strive to provide an unforgettable experience
for all our guests. Come and enjoy the ultimate in hospitality and comfort.
Welcome to our luxurious hotel! Our hotel offers the best services and facilities
to ensure you have a comfortable and enjoyable stay. From our beautifully designed
rooms to our state-of-the-art amenities, we strive to provide an unforgettable experience
for all our guests. Come and enjoy the ultimate in hospitality and comfort.
Welcome to our luxurious hotel! Our hotel offers the best services and facilities
to ensure you have a comfortable and enjoyable stay. From our beautifully designed
rooms to our state-of-the-art amenities, we strive to provide an unforgettable experience
for all our guests. Come and enjoy the ultimate in hospitality and comfort.
Welcome to our luxurious hotel! Our hotel offers the best services and facilities
to ensure you have a comfortable and enjoyable stay. From our beautifully designed
rooms to our state-of-the-art amenities, we strive to provide an unforgettable experience
for all our guests. Come and enjoy the ultimate in hospitality and comfort.
Welcome to our luxurious hotel! Our hotel offers the best services and facilities
to ensure you have a comfortable and enjoyable stay. From our beautifully designed
rooms to our state-of-the-art amenities, we strive to provide an unforgettable experience
for all our guests. Come and enjoy the ultimate in hospitality and comfort.
Welcome to our luxurious hotel! Our hotel offers the best services and facilities
to ensure you have a comfortable and enjoyable stay. From our beautifully designed
rooms to our state-of-the-art amenities, we strive to provide an unforgettable experience
for all our guests. Come and enjoy the ultimate in hospitality and comfort.

`;
const HotelAbout = () => {
    // const HotelAbout = ({ hotelDescription, hotelImage }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const getShortDescription = () => {
        const words = description.split(' ');
        if (words.length <= 70) {
            return description;
        }
        return words.slice(0, 100).join(' ') + '...';
    };
    return (
        <Row gutter={[16, 16]} style={{ width: '100%', height: 'fit-content' }} justify={'center'} className='introduction-hotel-layout'>
            <p className='about-hotel-title'>About Hotel</p>
            <Col xs={24} md={24}>
                <div className="hotel-detail-about-container">
                    {hotelImages?.map((src, index) => (
                        <img key={index} src={src} alt={`Hotel view ${index + 1}`} style={{ width: '400px', height: '270px', padding: '1.3rem' }} />
                    ))}
                </div>
            </Col>
            <Card className="hotel-detail-about-description">
                <p>{isExpanded ? description : getShortDescription()}</p>
                {description.split(' ').length > 100 && (
                    <Button
                        type="link"
                        onClick={toggleExpand}
                        style={{marginLeft:'-15px',fontSize:'1.1rem'}}
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                )}
            </Card>
        </Row>
    );
}

export default HotelAbout;
