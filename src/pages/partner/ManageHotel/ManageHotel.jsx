import React, { useEffect, useState } from 'react'
import "./ManageHotel.scss"
import { Table, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { hotelApi } from "../../../services/hotelAPI";
const columns = [
    {
        title: 'Hotel Name',
        dataIndex: 'hotel_name',
        key: 'hotel_name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
    },
    {
        title: 'Location',
        key: 'location',
        render: (_, record) => (
            <span>{record.location?.province}</span>
        ),
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            let color;
            const lowercaseStatus = status.toLowerCase();
            switch (lowercaseStatus) {
                case 'pending':
                    color = 'processing';
                    break;
                case 'REJECTED':
                    color = 'red';
                    break;
                case 'ACTIVE':
                    color = 'success';
                    break;
                case 'INACTIVE':
                    color = 'warning';
                    break;
                case 'APPROVED':
                    color = 'orange';
                    break;
                case 'CLOSED':
                    color = 'cyan';
                    break;

            }
            return (
                <Tag color={color}>
                    {status.toUpperCase()}
                </Tag>
            );
        },
    },


    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div>
                <div style={{ marginRight: '8px' }}>
                    <Link to={`${record.id}/edit`}>Edit</Link>
                </div>
                <div>
                    <Link to={`${record.id}/manage-room`}>Room</Link>
                </div>
            </div>
        ),
    },
];


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const ManageHotel = () => {
    const [getHotel] = hotelApi.useGetHotelMutation();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getHotel();
                setData(result?.data?.data);
            } catch (error) {
                console.error("Error fetching hotel data:", error);
            }
        };

        fetchData();
    }, []);



    console.log("Hotel data:", data);
    const hotelData = data?.content;

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
                dataSource={hotelData}
                onChange={onChange}
                scroll={{ y: 440, }}
            />
        </div>
    )
}

export default ManageHotel