import "./HotelRegistration.scss";
import { Table, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Hotel Name',
        dataIndex: 'hotelName',
        key: 'hotelName',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, record) => (
            <Tag >
                {record.status}
            </Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div>
                <p><a>Edit</a></p>
                <p><a>Manage Room</a></p>
            </div>
        ),
    },
];

const data = [
    {
        "hotelName": "Intercontinental",
        "rating": 5,
        "location": "District 1, Ho Chi Minh City",
        "brand": "Luxury",
        "status:": "Active",
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

function HotelRigistration() {
    return (
        <div className='hotel-registration-wrapper'>
            <p><h2 className='title'>Registration</h2></p>
            <div className="action">
                <div className='search'>
                    <SearchOutlined className='icon' />
                    <input className='input' type="text" />
                </div>
                <button className="new-btn">
                    <PlusCircleOutlined />
                    New registration
                </button>
            </div>
            <Table
                bordered={true}
                columns={columns}
                dataSource={data}
                onChange={onChange}
                scroll={{
                    y: 440,
                }}
            />
        </div>
    );
}

export default HotelRigistration;