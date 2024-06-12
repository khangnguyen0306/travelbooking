import React, { useState } from 'react'
import "./AdminManagePartners.scss";
import { Table, Tag, Button, Modal } from 'antd';
import {
    SearchOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const AdminManagePartners = () => {
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date of birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'ACTIVE',
                    value: 'ACTIVE',
                },
                {
                    text: 'INACTIVE',
                    value: 'INACTIVE',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, record) => (
                <div>
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
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    {
                        record.status === "ACTIVE"
                            ?
                            <Button onClick={showModal}><ExclamationCircleOutlined /> INACTIVE</Button>
                            :
                            <Button onClick={showModal}><CheckCircleOutlined /> ACTIVE</Button>
                    }
                </div>
            ),
        },
    ];

    const data = [
        {
            "name": "Nguyễn Văn A",
            "dob": "1950-11-13T22:09:58.771Z",
            "address": "1 Nguyễn Oanh, Phường 6, Gò Vấp, TP.HCM",
            "email": "Mariane.Dach39@yahoo.com",
            "phone": "533-910-9858",
            "status": "INACTIVE",
            "id": "1"
        },
        {
            "name": "Nguyễn Văn B",
            "dob": "1950-11-13T22:09:58.771Z",
            "address": "11 Nguyễn Oanh, Phường 6, Gò Vấp, TP.HCM",
            "email": "Mariane2.Dach39@yahoo.com",
            "phone": "533-910-9858",
            "status": "ACTIVE",
            "id": "2"
        },
        {
            "name": "Nguyễn Văn C",
            "dob": "1950-11-13T22:09:58.771Z",
            "address": "111 Nguyễn Oanh, Phường 6, Gò Vấp, TP.HCM",
            "email": "Mariane3.Dach39@yahoo.com",
            "phone": "533-910-9858",
            "status": "INACTIVE",
            "id": "3"
        },
        {
            "name": "Nguyễn Văn D",
            "dob": "1950-11-13T22:09:58.771Z",
            "address": "101 Nguyễn Oanh, Phường 6, Gò Vấp, TP.HCM",
            "email": "Mariane4.Dach39@yahoo.com",
            "phone": "533-910-9858",
            "status": "ACTIVE",
            "id": "4"
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='admin-manage-partners-wrapper'>
            <h2 className='title'>List of partners:</h2>
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
                title="Change Status Of Partner"
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

export default AdminManagePartners;