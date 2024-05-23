import React from 'react'
import { useGetHotelListQuery } from '../../services/roomAPI'
import { TinyColor } from '@ctrl/tinycolor';
import { Link } from 'react-router-dom';
import './HotelList.scss'
import { Col, Row, DatePicker, Space, InputNumber, Checkbox, Button, ConfigProvider, Rate } from "antd";
const HotelList = () => {
    const { data: hoteldata, isLoading } = useGetHotelListQuery();
    const colors2 = ['#ddd', '#8c8c8c', '#8c8c8c', '#343333'];
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());
    console.log(hoteldata);
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
            imgUrl: 'https://source.unsplash.com/600x400/?hotel,room',
        }, {
            id: 4,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            originalPrice: 90,
            discountPrice: 75,
            imgUrl: 'https://source.unsplash.com/600x400/?hotel,room',
            discount: '17% OFF'
        }, {
            id: 5,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x400/?hotel,room',
        }, {
            id: 6,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x400/?hotel,room',
            discount: '17% OFF'
        }, {
            id: 7,
            name: 'Luxury Suite',
            description: 'Our Suites has been honored with the prestigious Five-Star Award by Forbes.',
            rating: 5,
            reviews: 1,
            price: 90,
            imgUrl: 'https://source.unsplash.com/600x400/?hotel,room',
        },
    ];
    return (
        <div className='container-hotel-hotelSearch'>

            <h1 className='titel'>Hotel Search</h1>
            <div className="hotel">
                <Row>
                    <Col xs={24} md={6}>
                        <div className="filter">
                            <div className="check-in">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <div className='check-in-title'>Check in</div>
                                    <DatePicker
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Space>
                            </div>
                            <div className="check-out">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <div className='check-out-title'>Check out</div>
                                    <DatePicker
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Space>
                            </div>

                            <div className="check-out">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <div className='check-out-title'>Room</div>
                                    <InputNumber size="large" style={{ width: '100%', }} min={1} max={100000} defaultValue={1} />
                                </Space>
                            </div>

                            <div className="check-out">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <div className='check-out-title'>Guests</div>
                                    <span>ADULTS</span>
                                    <InputNumber size="large" style={{ width: '100%', }} min={1} max={100000} defaultValue={1} />
                                    <span>CHILDREN</span>
                                    <InputNumber size="large" style={{ width: '100%', }} min={1} max={100000} defaultValue={1} />
                                </Space>
                            </div>
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
                                <ConfigProvider
                                    className="button-container"
                                    theme={{
                                        components: {
                                            Button: {
                                                colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                                                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                                                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                                                lineWidth: 0,
                                            },
                                        },
                                    }}
                                >
                                    <Button className="button-container" style={{ width: '100%', }} type="primary" size="large">
                                        Search Room
                                    </Button>
                                </ConfigProvider>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={18}>
                        <div className="list-hotel">
                            {hoteldata?.map((hotel) => (
                                <div key={hotel.id} className="hotel-item">
                                    {hotel.discount && <div className="hotel-discount">{hotel.discount}</div>}
                                    <img src={hotel.imgUrl} alt={hotel.name} className="hotel-img" />
                                    <div className="hotel-info">
                                        <h2 className="hotel-name">{hotel.name}</h2>
                                        <p className="hotel-description">{hotel.description}</p>
                                        <div className="hotel-rating">
                                            <Rate allowHalf value={hotel.rating} disabled />
                                            <span>({hotel.reviews} Review{hotel.reviews > 1 && 's'})</span>
                                        </div>
                                        <Row>
                                            <Col xs={24} md={14}>
                                                <Link to={`/hotel-detail/${hotel.id}`}>
                                                    <div className="hotel-book-now">DETAIL</div>
                                                </Link>
                                            </Col>
                                            <Col xs={24} md={10}>
                                                <div className="hotel-price">
                                                    From <span className="hotel-original-price">{hotel.originalPrice && `$${hotel.originalPrice}`}</span> <span className="hotel-current-price">${hotel.price ? hotel.price : hotel.discountPrice}</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>
            {/* {isLoading ? <div>Hotels are loading</div> : <div>{hoteldata.map(hotel => <div>{hotel.name}</div>)}</div>} */}
        </div>
    )
}

export default HotelList