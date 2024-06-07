import { Marker, Popup } from "react-leaflet";
import "../scss/pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
    // Check if item is defined and has the required properties
    const isValidItem = item && Array.isArray(item) && item.length >= 2;

    // Fallback position if item is invalid
    const position = isValidItem ? [item[0], item[1]] : [52.4797, -1.90269];

    return (
        <Marker position={position}>
            <Popup>
                {isValidItem ? (
                    <div className="popupContainer">
                        <div className="textContainer">
                            <Link to={`/${item.id}`}>{item.name}</Link>
                            {/* <span>{item.bedroom} bedroom</span> */}
                            {/* <b>$ {item.price}</b> */}
                        </div>
                    </div>
                ) : (
                    <div className="popupContainer">
                        <div className="textContainer">
                            <span>Invalid location</span>
                        </div>
                    </div>
                )}
            </Popup>
        </Marker>
    );
}

export default Pin;
