import { MapContainer, TileLayer } from "react-leaflet";
import "../scss/map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

function Map({ items, name }) {
    // Check if items is an array with at least two elements (lat and lng)
    const isValidItems = Array.isArray(items) && items.length >= 2;
    const center = isValidItems ? [items[0], items[1]] : [52.4797, -1.90269]; // Default coordinates

    return (
        <MapContainer
            center={center}
            style={{ zIndex: '0' }}
            zoom={7}
            scrollWheelZoom={true}
            className="map"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Pin on map */}
            {isValidItems && (
                <Pin
                    item={items}
                    name={name}
                />
            )}
        </MapContainer>
    );
}

export default Map;
