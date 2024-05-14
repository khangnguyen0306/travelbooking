import "./RoomsSection.scss";
import RoomItem from "./RoomItem";

function RoomsSection() {
    return (
        <div id="rooms-section">
            <h1 className="title">Hotel <span>Rooms</span></h1>
            <div className="list-rooms">
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
            </div>
            <div className="more">
                <a className="link" href="">View All Rooms</a>
            </div>
        </div>
    );
}

export default RoomsSection;