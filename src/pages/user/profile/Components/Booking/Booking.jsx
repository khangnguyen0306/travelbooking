import { Col, Row, Table, Space, Tag } from 'antd'
import React, { useState } from 'react'
import './Booking.scss'
const Booking = (hasData) => {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Detail',
            children: [
                {
                    title: 'Guest',
                    dataIndex: 'guest',
                    sorter: (a, b) => a.guest - b.guest,
                },
                {
                    title: 'Room',
                    dataIndex: 'room',
                    sorter: (a, b) => a.room - b.room,
                },
            ]
        },

        {
            title: 'Total',
            dataIndex: 'tatol',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            filters: [
                {
                    text: 'Hà Nội',
                    value: 'Hà Nội',
                },
                {
                    text: 'Đồng Tháp',
                    value: 'Đồng Tháp',
                },
            ],
            onFilter: (value, record) => record.location.startsWith(value),
            filterSearch: true,
        },
        {
            title: 'State',
            dataIndex: 'state',
            render: (tags) => (
                <>
                    {tags?.map((tag) => {
                        let color;
                        const lowercaseTag = tag.toLowerCase();
                        switch (lowercaseTag) {
                            case 'pending':
                                color = 'processing';
                                break;
                            case 'cancelled':
                                color = 'red';
                                break;
                            case 'completed':
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
        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },

    ];
    const data = [
        {
            key: '1',
            date: " 10/10/2010",
            location: 'Hà Nội',
            state: ['Pending'],
            guest: 5,
            room: 3,
        },
        {
            key: '2',
            date: "24/12/2023",
            location: 'Bến Tre',
            state: ['Cancelled'],
            guest: 4,
            room: 2,
        },
        {
            key: '3',
            date: "23/12/2020",
            location: 'Đồng Tháp',
            state: ['Completed'],
            guest: 2,
            room: 2,
        },
    ];

    return (

        <div>
            {data.length > 0 ? (
                <div>
                    <Table columns={columns} dataSource={data} className='custom-table' />
                </div>
            ) : (
                <div>
                    <Row>
                        <Col xs={24} md={4} >
                            <img src='https://ik.imagekit.io/tvlk/image/imageResource/2020/07/10/1594367281441-5ec1b573d106b7aec243b19efa02ac56.svg?tr=h-96,q-75,w-96' alt='No data' />
                        </Col>
                        <Col xs={24} md={20}>
                            <h2>No Booking Data Found</h2>
                            <h4 style={{ marginTop: '20px' }}>Every booking you book will be displayed here, looks like you haven't made any booking yet, book on the homepage now!</h4>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    )
}

export default Booking