import '../scss/HotelAbout.scss';
import React from 'react';
import { Card } from 'antd';
import Carousel from './Carousel';

const HotelAbout = ({ data }) => {
    return (
        <div className='hotel-about-section'>
            <p className='about-hotel-title'>About Hotel</p>
            <Carousel images={data?.images_urls} />
            <Card className="hotel-detail-about-description">
                <p>{data?.description}</p>
            </Card>
        </div>

    );
}

export default HotelAbout;
