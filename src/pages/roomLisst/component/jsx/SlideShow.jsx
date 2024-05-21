import React from 'react'
import "../scss/hotelDetail.scss"
import { Col, Row } from 'antd'
import Slider from 'react-slick';
const SlideShow = ({ bigImages, smallImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Row justify="center" style={{ width: '100%', marginTop: '30px' }}>
            <Col xs={24} md={12} className='image-main'>
                <Slider {...settings}>
                    {bigImages.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
                        </div>
                    ))}
                </Slider>
            </Col>
            <Col xs={24} md={8} className="small-image">
                {smallImages.map((image, index) => (
                    <div key={index} className='small-image-container'>
                        <img src={image} alt={`Small ${index + 1}`} style={{ marginBottom: '10px' }} />
                    </div>
                ))}
            </Col>
        </Row>
    )
}

export default SlideShow