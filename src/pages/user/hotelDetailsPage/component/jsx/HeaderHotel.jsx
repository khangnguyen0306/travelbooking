import "../scss/HeaderHotel.scss"
import { Link } from 'react-router-dom';
import { Rate } from 'antd'
import { EnvironmentFilled, RightOutlined } from '@ant-design/icons';

const HeaderHotel = ({ data, toHotelAbout, toAmentites }) => {
    return (
        <div className='header-hotelDetail-container'>
            <div className='left'>
                <div className="card-header">
                    <p className="title">Introducing the hotel</p>
                    <Link className="link" onClick={toHotelAbout}>
                        View more <RightOutlined />
                    </Link>
                </div>
                <div className="card-header">
                    <p className="title">Main utilities</p>
                    <Link className="link" onClick={toAmentites} >
                        View more <RightOutlined />
                    </Link>
                </div>
            </div>
            <div className='right'>
                <div className='name-rating'>
                    <p className='hotelDetail-name'>
                        {data?.hotel_name}
                    </p>
                    <Rate disabled allowHalf value={data?.rating} />
                </div>
                <p className='hotelDetail-brand'>
                    {data?.brand}
                </p>
                <p className='hotelDetail-location'>
                    <EnvironmentFilled /> {data?.address}
                </p>
            </div>
        </div >
    )
}

export default HeaderHotel