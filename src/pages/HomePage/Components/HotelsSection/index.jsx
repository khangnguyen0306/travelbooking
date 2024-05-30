import "./HotelsSection.scss";
import HotelItem from "./HotelItem";

function HotelsSection() {
    return (
        <div id="rooms-section">
            <h1 className="title">Hotels</h1>
            <div className="list-rooms">
                <HotelItem />
                <HotelItem />
                <HotelItem />
                <HotelItem />
            </div>
            <div className="more">
                <a className="link" href="">View More Hotels</a>
            </div>
        </div>
    );
}

export default HotelsSection;