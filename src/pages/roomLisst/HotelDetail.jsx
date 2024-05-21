import React from 'react';
import { useGetHotelByIdQuery } from '../../services/roomAPI';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import "./component/scss/hotelDetail.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderHotel from './component/jsx/HeaderHotel';
import SlideShow from './component/jsx/SlideShow';
import IntroductionHotel from './component/jsx/IntroductionHotel';

const RoomlistDetail = () => {
    const { hotelId } = useParams('hotelId');
    const { data: hotelDetail, isLoading } = useGetHotelByIdQuery(hotelId);
    const bigImages = hotelDetail?.image.slice(0, 6);
    const smallImages = hotelDetail?.image.slice(2, 6);



    const HeaderParams = {
        name: hotelDetail?.name,
        rate: hotelDetail?.rate,
        location: hotelDetail?.location,
    };
    const SlideParams = {
        bigImages: bigImages,
        smallImages: smallImages,
    }




    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <Row style={{ marginTop: '6rem', width: "100%" }}>
                <HeaderHotel {...HeaderParams} />
                <SlideShow {...SlideParams} />
                <IntroductionHotel />
            </Row>
        </>
    );
}

export default RoomlistDetail;
