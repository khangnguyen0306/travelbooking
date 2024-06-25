import '../scss/HotelAbout.scss';
import React, { useState } from 'react';
import { Button, Card } from 'antd';
import Carousel from './Carousel';

const HotelAbout = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const getShortDescription = () => {
        const words = data?.hotelDescription || "";
        if (words.length <= 70) {
            return data?.hotelDescription;
        }
        return words.slice(0, 70).join(' ') + '...';
    };
    return (
        <div className='hotel-about-section'>
            <p className='about-hotel-title'>About Hotel</p>
            <Carousel images={data?.hotelImages} />
            <Card className="hotel-detail-about-description">
                <p>{isExpanded ? data?.hotelDescription : getShortDescription()}</p>
                {data?.hotelDescription?.split(' ').length > 100 && (
                    <Button
                        type="link"
                        onClick={toggleExpand}
                        style={{ marginLeft: '-15px', fontSize: '1.1rem' }}
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                )}
            </Card>
        </div>

    );
}

export default HotelAbout;
