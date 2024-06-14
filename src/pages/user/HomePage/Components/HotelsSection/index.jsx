import "./HotelsSection.scss";
import HotelItem from "./HotelItem";
import { Link } from 'react-router-dom';

function HotelsSection() {
    return (
        <div id="hotels-section">
            <h1 className="title">Hotels</h1>
            <div className="list-rooms">
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
            </div>
            <div className="more">
                <Link className="link" to="/view-hotels">View More Hotels</Link>
            </div>
        </div>
    );
}

export default HotelsSection;