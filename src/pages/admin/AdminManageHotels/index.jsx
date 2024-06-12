import React, { useState } from 'react'
import "./AdminManageHotels.scss";
import { Table, Tag, Button, Popover, Modal } from 'antd';
import {
    SearchOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminManageHotels = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Hotel Name',
            dataIndex: 'hotelName',
            key: 'hotelName',
            render: (text, record) => <Link to={`/admin/hotel-details/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'PENDING',
                    value: 'PENDING',
                },
                {
                    text: 'APPROVED',
                    value: 'APPROVED',
                },
                {
                    text: 'REJECTED',
                    value: 'REJECTED',
                },
                {
                    text: 'ACTIVE',
                    value: 'ACTIVE',
                },
                {
                    text: 'INACTIVE',
                    value: 'INACTIVE',
                },
                {
                    text: 'CLOSED',
                    value: 'CLOSED',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, record) => (
                <div>
                    {record.status === "APPROVED" &&
                        < Tag icon={<CheckCircleOutlined />} color="success">
                            {record.status}
                        </Tag>
                    }
                    {record.status === "PENDING" &&
                        < Tag icon={< SyncOutlined spin />} color="processing" >
                            {record.status}
                        </Tag >
                    }
                    {record.status === "REJECTED" &&
                        < Tag icon={< CloseCircleOutlined />} color="error" >
                            {record.status}
                        </Tag >
                    }
                    {record.status === "ACTIVE" &&
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            {record.status}
                        </Tag>
                    }
                    {record.status === "INACTIVE" &&
                        <Tag icon={<ExclamationCircleOutlined />} color="warning">
                            {record.status}
                        </Tag>
                    }
                    {record.status === "CLOSED" &&
                        <Tag icon={<CloseCircleOutlined />} color="error">
                            {record.status}
                        </Tag>
                    }
                </div >
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    {
                        (record.status === "APPROVED" || record.status === "REJECTED") ||
                        < Popover style={{ textAlign: "center", }} content={
                            < div >
                                {
                                    record.status === "PENDING" && <div>
                                        <p onClick={showModal} className='action-item'>
                                            < Tag icon={<CheckCircleOutlined />} color="success">
                                                APPROVED
                                            </Tag>
                                        </p>
                                        <p onClick={showModal} className='action-item'>
                                            < Tag icon={< CloseCircleOutlined />} color="error" >
                                                REJECTED
                                            </Tag >
                                        </p>
                                    </div>
                                }
                                {
                                    record.status === "ACTIVE" && <div>
                                        <p onClick={showModal} className='action-item'>
                                            <Tag icon={<ExclamationCircleOutlined />} color="warning">
                                                INACTIVE
                                            </Tag>
                                        </p>
                                        <p onClick={showModal} className='action-item'>
                                            <Tag icon={<CloseCircleOutlined />} color="error">
                                                CLOSED
                                            </Tag>
                                        </p>
                                    </div>
                                }
                                {
                                    record.status === "INACTIVE" && <div>
                                        <p onClick={showModal} className='action-item'>
                                            <Tag icon={<CheckCircleOutlined />} color="success">
                                                ACTIVE
                                            </Tag>
                                        </p>
                                        <p onClick={showModal} className='action-item error'>
                                            <Tag icon={<CloseCircleOutlined />} color="error">
                                                CLOSED
                                            </Tag>
                                        </p>
                                    </div>
                                }
                                {
                                    record.status === "CLOSED" && <div>
                                        <p onClick={showModal} className='action-item'>
                                            <Tag icon={<CheckCircleOutlined />} color="success">
                                                ACTIVE
                                            </Tag>
                                        </p>
                                    </div>
                                }
                            </div >
                        } trigger="hover" >
                            <Button>Change Status</Button>
                        </Popover >
                    }
                </>
            ),
        },
    ];

    const data = [
        {
            "hotelName": "Intercontinental 1",
            "address": "1 Nam Kỳ khởi nghĩa, Phường Bến Thành, Quận 1",
            "province": "Ho Chi Minh City",
            "status": "PENDING",
            "id": "1"
        },
        {
            "hotelName": "Intercontinental 2",
            "address": "2 Nam Kỳ khởi nghĩa, Phường Bến Thành, Quận 1",
            "province": "Ho Chi Minh City",
            "status": "APPROVED",
            "id": "2"
        },
        {
            "hotelName": "Intercontinental 3",
            "address": "3 Nam Kỳ khởi nghĩa, Phường Bến Thành, Quận 1",
            "province": "Ho Chi Minh City",
            "status": "REJECTED",
            "id": "3"
        },
        {
            "hotelName": "Intercontinental 4",
            "address": "4 Nam Kỳ khởi nghĩa, Phường Bến Thành, Quận 1",
            "province": "Ho Chi Minh City",
            "status": "ACTIVE",
            "id": "4"
        },
        {
            "hotelName": "Intercontinental 5",
            "address": "5 Nam Kỳ khởi nghĩa, Phường Bến Thành, Quận 1",
            "province": "Ho Chi Minh City",
            "status": "INACTIVE",
            "id": "5"
        },
        {
            "hotelName": "Intercontinental 6",
            "address": "6 Nam Kỳ khởi nghĩa, Phường Bến Thành, Quận 1",
            "province": "Ho Chi Minh City",
            "status": "CLOSED",
            "id": "6"
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='admin-manage-hotels-wrapper'>
            <h2 className='title'>List of hotels:</h2>
            <div className='search'>
                <SearchOutlined className='icon' />
                <input className='input' type="text" />
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
            <Modal
                title="Change Status Of Hotel"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                width={"400px"}
                style={{
                    zIndex: "9999",
                }}
            >
                <p>Are you sure to do that?</p>
            </Modal>
        </div>
    )
}

export default AdminManageHotels