import React from 'react'
import "./ManageRoom.scss"
import { Table, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Room Type',
        dataIndex: 'roomtype',
        key: 'hotelName',
        render: (text) => <a>{text}</a>,
    },

    {
        title: 'Number Of Rooms',
        dataIndex: 'number_of_rooms',
        key: 'number_of_rooms',
    },
    {
        title: 'Price',
        dataIndex: 'room_price',
        key: 'room_price',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (tags) => (
            <>
                {tags?.map((tag) => {
                    let color;
                    const lowercaseTag = tag.toLowerCase();
                    switch (lowercaseTag) {
                        case 'out of order':
                            color = 'processing';
                            break;
                        case 'occupied':
                            color = 'red';
                            break;
                        case 'available':
                            color = 'success';
                            break;
                        default:
                            color = 'default'; // Màu mặc định nếu không khớp với bất kỳ trạng thái nào
                            break;
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag?.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div>
                <div style={{ marginRight: '8px' }}>
                    <Link>Update</Link>
                </div>
                <div>
                    <Link>Delete</Link>
                </div>
            </div>
        ),
    },
];

const data = [
    {
        roomtype: "Luxury Room",
        number_of_rooms: 5,
        room_price: "25$",
        status: ["Occupied"],
        id: 1
    },
    {
        roomtype: "Luxury Room",
        number_of_rooms: 5,
        room_price: "25$",
        status: ["Out Of Order"],
        id: 3
    },
    {
        roomtype: "Luxury Room",
        number_of_rooms: 5,
        room_price: "25$",
        status: ["Available"],
        id: 2
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const ManageRoom = () => {
    return (
        <div className='manage-hotel-wrapper'>
            <p><h2 className='title'>Manage Rooms</h2></p>
            <div className="action">
                <div className='search'>
                    <SearchOutlined className='icon' />
                    <input className='input' type="text" />
                </div>
                <Link className="new-btn" to={"/partner/create-hotel"}>
                    <PlusCircleOutlined />
                    New Room
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

export default ManageRoom