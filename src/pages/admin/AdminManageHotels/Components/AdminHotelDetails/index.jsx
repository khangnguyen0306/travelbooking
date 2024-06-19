import "./AdminHotelDetails.scss";
import { useGetHotelDetailsForAdminQuery } from '../../../../../services/hotelAPI';
import { useParams } from "react-router-dom";
import { Rate, Tag } from 'antd';
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

function AdminHotelDetails() {
    const params = useParams();
    const { data } = useGetHotelDetailsForAdminQuery(params.hotelId);
    console.log(data);

    // Sử dụng reduce để gộp các key có giá trị là true thành một mảng duy nhất
    const finalConveniences = data?.data?.conveniences.reduce((acc, convenience) => {
        Object.entries(convenience).forEach(([key, value]) => {
            if (value === true) {
                acc.push(key);
            }
        });
        return acc;
    }, []);

    return (
        <div className="admin-hotel-details-wrapper">
            <div className="card">
                <div className="hotel-info">
                    <h2 className="item">Hotel Details</h2>
                    <div className="item">
                        {data?.data?.status === "APPROVED" &&
                            < Tag icon={<CheckCircleOutlined />} color="success">
                                {data?.data?.status}
                            </Tag>
                        }
                        {data?.data?.status === "PENDING" &&
                            < Tag icon={< SyncOutlined spin />} color="processing" >
                                {data?.data?.status}
                            </Tag >
                        }
                        {data?.data?.status === "REJECTED" &&
                            < Tag icon={< CloseCircleOutlined />} color="error" >
                                {data?.data?.status}
                            </Tag >
                        }
                        {data?.data?.status === "ACTIVE" &&
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                {data?.data?.status}
                            </Tag>
                        }
                        {data?.data?.status === "INACTIVE" &&
                            <Tag icon={<ExclamationCircleOutlined />} color="warning">
                                {data?.data?.status}
                            </Tag>
                        }
                        {data?.data?.status === "CLOSED" &&
                            <Tag icon={<CloseCircleOutlined />} color="error">
                                {data?.data?.status}
                            </Tag>
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
                        <label>Hotel Name</label>
                        <p className="input">{data?.data?.hotel_name}</p>
                    </div>
                    <div className="item-25">
                        <label>Rating</label>
                        <Rate className="input" disabled value={Number(data?.data?.rating)} />
                    </div>
                    <div className="item-25">
                        <label>Brand</label>
                        <p className="input">{data?.data?.brand}</p>
                    </div>
                    <div className="item-100">
                        <label>Description</label>
                        <p className="input">{data?.data?.description}</p>
                    </div>
                    <div className="item-100">
                        <label>Business License</label>
                        <p className="input">
                            <a href={data?.data?.business_license} target="_blank" rel="noopener noreferrer">
                                {data?.data?.business_license}
                            </a>
                        </p>
                    </div>
                    <div className="item-100">
                        <h3>Location:</h3>
                        <div className="location">
                            <div className="item-75">
                                <label>Address</label>
                                <p className="input">{data?.data?.location?.address}</p>
                            </div>
                            <div className="item-25">
                                <label>Province*</label>
                                <p className="input">{data?.data?.location?.province}</p>
                            </div>
                        </div>
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
                </div>
                <div className="partner-info">
                    <h2>Partner Info</h2>
                </div>
                <div className="details">
                    <div className="item-50">
                        <label>Full Name</label>
                        <p className="input">{data?.data?.partner?.full_name}</p>
                    </div>
                    <div className="item-25">
                        <label>Email</label>
                        <p className="input">{data?.data?.partner?.email}</p>
                    </div>
                    <div className="item-25">
                        <label>Phone</label>
                        <p className="input">{data?.data?.partner?.phone_number}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHotelDetails;