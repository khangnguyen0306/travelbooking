import React, { useEffect, useState } from 'react'
import "./ManageHotel.scss"
import { Table, Tag, Pagination } from 'antd';
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



const ManageHotel = () => {
    const { data, refetch } = hotelApi.useGetFullHotelQuery();
    const HotelData = data?.data?.content

    console.log("Hotel data:", data);

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
                dataSource={HotelData}
                scroll={{ y: 440, }}
            />

        </div>
    )
}

export default ManageHotel