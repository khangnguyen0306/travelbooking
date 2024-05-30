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
import Roomlist from './component/jsx/Roomlist';
import HotelAbout from './component/jsx/HotelAbout';

const RoomlistDetail = () => {
    const { hotelId } = useParams('hotelId');
    const { data: hotelDetail, isLoading } = useGetHotelByIdQuery(hotelId);
    const bigImages = hotelDetail?.image?.slice(0, 6);
    const smallImages = hotelDetail?.image?.slice(0, 4);


    const HeaderParams = {
        name: hotelDetail?.name,
        rate: hotelDetail?.rate,
        location: hotelDetail?.location,
    };

    const SlideParams = {
        bigImages: bigImages,
        smallImages: smallImages,

    };

    const IntroductionParams = {
        description: hotelDetail?.description,
        amenities: hotelDetail?.amenities,
        address: hotelDetail?.address,
        name: hotelDetail?.name,
    }

    const RoomListParams = {
        hotelId: hotelId
    }
    const HotelDescription = {
        hotelDescription: hotelDetail?.description,
        hotelImage: hotelDetail?.image?.slice(0, 3)
    }




    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    
    return (
        <>
            <Row style={{ marginTop: '6rem', width: "100%" }}>
                <HeaderHotel {...HeaderParams} />
                <SlideShow {...SlideParams} />
                <IntroductionHotel {...IntroductionParams} />
                <Roomlist {...RoomListParams} />
                <HotelAbout {...HotelDescription} />
            </Row>
        </>
    );
}

export default RoomlistDetail;
