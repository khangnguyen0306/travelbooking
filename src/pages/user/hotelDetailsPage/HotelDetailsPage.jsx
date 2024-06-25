import "./HotelDetailsPage.scss";
import React, { useRef } from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import HeaderHotel from './component/jsx/HeaderHotel';
import HotelAbout from './component/jsx/HotelAbout';
import Amentites from './component/jsx/Amentites';
import Roomlist from './component/jsx/Roomlist';
import { useGetHotelDetailsForGuestQuery } from '../../../services/hotelAPI';

const RoomlistDetail = () => {
    const { hotelId } = useParams('hotelId');
    const { data, isLoading } = useGetHotelDetailsForGuestQuery(hotelId);
    console.log(data?.data);

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
        hotel_name: data?.data?.hotel_name,
        brand: data?.data?.brand,
        rating: data?.data?.rating,
        address: data?.data?.location?.address,
    };

    const AboutParams = {
        hotelDescription: data?.data?.description,
        hotelImage: data?.data?.image_urls
    }

    const AmentitesParams = {
        conveniences: data?.data?.conveniences
    }

    const RoomListParams = {
        hotelId: hotelId
    }

    return (
        <div className="hotel-details-page-wrapper">
            <Spin spinning={isLoading}>
                <HeaderHotel data={HeaderParams} toHotelAbout={scrollToHotelAbout} toAmentites={scrollToAmentites} />
                <div ref={hotelAboutRef}>
                    <HotelAbout data={AboutParams} />
                </div>
                <div ref={amentitesRef}>
                    <Amentites data={AmentitesParams} />
                </div>
                <Roomlist {...RoomListParams} />
            </Spin>
        </div>
    );
}

export default RoomlistDetail;
