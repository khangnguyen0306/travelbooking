
import { MapContainer, TileLayer } from "react-leaflet";
import "../scss/map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";
// import Pin from "../pin/pin";

function Map(
    {
        items,
        name,
    }) {

    return (
        <MapContainer
            // map latitude and longitude
            center={
                items ? [items[0], items[1]] : [52.4797, -1.90269]
            }
            style={{zIndex:'0'}}
            zoom={7}
            scrollWheelZoom={true}
            className="map"
        >


            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* Pin on map */}

            <Pin
                item={items}
                name={name}
            />


        </MapContainer>
    );
}

export default Map;