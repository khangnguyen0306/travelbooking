import { Marker, Popup } from "react-leaflet";
import "../scss/pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
    return (
        <Marker
            position={[item[0], item[1]]}
        >
            <Popup>
                <div className="popupContainer">
                    <div className="textContainer">
                        <Link to={`/${item?.id}`}>{item?.name}</Link>
                        {/* <span>{item?.bedroom} bedroom</span> */}
                        {/* <b>$ {item?.price}</b> */}
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default Pin;