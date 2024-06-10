import React from 'react'
import "./ManageHotel.scss"
import { Table, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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

const ManageHotel = () => {
    return (
        <div className='manage-hotel-wrapper'>
            <p><h2 className='title'>Manage Hotels</h2></p>
            <div className="action">
                <div className='search'>
                    <SearchOutlined className='icon' />
                    <input className='input' type="text" />
                </div>
                <Link className="new-btn" to={"/partner/create-hotel"}>
                    <PlusCircleOutlined />
                    New Hotel
                </Link>
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
    )
}

export default ManageHotel