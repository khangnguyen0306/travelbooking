import React from 'react'
import "../scss/hotelDetail.scss"
import { Rate } from 'antd'
import { EnvironmentFilled } from '@ant-design/icons'
const HeaderHotel = ({ name, rate, location }) => {
    return (
        <div className='header-hotelDetail-container'>
            <p className='hotelDetail-title'>
                {name}
            </p>
            <p className='hotelDetail-rate'>
                <Rate disabled allowHalf value={rate} />
            </p>
            <p className='hotelDetail-location'>
                <EnvironmentFilled /> {location}
            </p>
        </div>
    )
}

export default HeaderHotel