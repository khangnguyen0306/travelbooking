import React, { useRef } from 'react';
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
import Amentites from './component/jsx/Amentites';

const RoomlistDetail = () => {
    const { hotelId } = useParams('hotelId');
    const { data: hotelDetail, isLoading } = useGetHotelByIdQuery(hotelId);
    const bigImages = hotelDetail?.image?.slice(0, 6);
    const smallImages = hotelDetail?.image?.slice(0, 4);


    // scroll to About page
    const hotelAboutRef = useRef(null);
    const scrollToHotelAbout = () => {
        hotelAboutRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // scroll to Amentites page
    const amentitesRef = useRef(null);
    const scrollToAmentites = () => {
        amentitesRef.current.scrollIntoView({ behavior: 'smooth' });
    };


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
        hotelAboutRef, scrollToHotelAbout,
        amentitesRef, scrollToAmentites
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
                <div ref={hotelAboutRef}>
                    <HotelAbout {...HotelDescription} />
                </div>
                <div ref={amentitesRef} style={{ width: '100%' }}>
                    <Amentites />
                </div>

            </Row>
        </>
    );
}

export default RoomlistDetail;
