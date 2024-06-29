import "./RoomDetail.scss";
import { roomApi } from '../../../services/roomAPI';
import { useParams } from "react-router-dom";
import { Rate, Tag } from 'antd';
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

function RoomDetail() {
    const { id } = useParams();

    const { data } = roomApi.useGetRoomDetailQuery(id);

    // Sử dụng reduce để gộp các key có giá trị là true thành một mảng duy nhất
    const finalConveniences = data?.data?.conveniences.reduce((acc, convenience) => {
        Object.entries(convenience).forEach(([key, value]) => {
            if (value === true) {
                acc.push(key);
            }
        });
        return acc;
    }, []);
    const finalTypes = data?.data?.types.reduce((acc, convenience) => {
        Object.entries(convenience).forEach(([key, value]) => {
            if (value === true) {
                acc.push(key);
            }
        });
        return acc;
    }, []);

    return (
        <div className="partner-hotel-details-wrapper">
            <div className="card">
                <div className="hotel-info">
                    <h2 className="item">Room Details</h2>
                    <div className="item">
                        {data?.data?.status === "AVAILABLE" &&
                            < Tag icon={<CheckCircleOutlined />} color="success">
                                {data?.data?.status}
                            </Tag>
                        }
                        {data?.data?.status === "UNAVAILABLE" &&
                            < Tag icon={< SyncOutlined spin />} color="processing" >
                                {data?.data?.status}
                            </Tag >
                        }
                        {data?.data?.status === "DISABLED" &&
                            < Tag icon={< CloseCircleOutlined />} color="error" >
                                {data?.data?.status}
                            </Tag >
                        }

                    </div>
                    <button className="item cancel" type="reset" onClick={() => {
                        window.history.back();
                    }}>
                        <CloseCircleOutlined />
                    </button>
                </div>
                <div className="details">
                    <div className="item-50">
                        <label>Room Name</label>
                        <p className="input">{data?.data?.room_type_name}</p>
                    </div>
                    <div className="item-50">
                        <label>Price</label>
                        <p className="input">{data?.data?.room_price}</p>
                    </div>
                    <div className="item-50">
                        <label>Capacity</label>
                        <p className="input">{data?.data?.capacity_per_room}</p>
                    </div>
                    <div className="item-50">
                        <label>Number Of Room</label>
                        <p className="input">{data?.data?.number_of_rooms}</p>
                    </div>
                    <div className="item-100">
                        <label>Description</label>
                        <p className="input">{data?.data?.description}</p>
                    </div>
                    <div className="item-100">
                        <label>Image Hotel</label>
                        {data?.data?.image_urls?.map((item, index) => (
                            <p key={index} className="input">
                                <a href={item?.image_url} target="_blank" rel="noopener noreferrer">
                                    Room Image No {index + 1}
                                </a>
                            </p>
                        ))}
                    </div>
                    <div className="item-100">
                        <h3>Conveniences:</h3>
                        <div className="conveniences">
                            {finalConveniences?.map((item, index) => (
                                <span key={index} className="sub-item">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="item-100">
                        <h3>Type Room:</h3>
                        <div className="conveniences">
                            {finalTypes?.map((item, index) => (
                                <span key={index} className="sub-item">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RoomDetail;