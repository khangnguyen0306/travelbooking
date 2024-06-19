import React, { useState, useRef } from 'react'
import "./AdminManageUsers.scss"
import { Table, Tag, Button, Modal, Tooltip, notification, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    LockOutlined,
    UnlockOutlined,
} from '@ant-design/icons';
import { useChangeStatusUserMutation, useGetUsersQuery } from '../../../services/userAPI';
import { Link } from 'react-router-dom';

const AdminManageUsers = () => {
    // hook call api
    const [changeStatus, { isLoading }] = useChangeStatusUserMutation();
    const { data, refetch } = useGetUsersQuery();

    // search in table
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    // active-inactive user
    const [activeUser, setActiveUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ham xu ly modal - active-inactive user
    const showModal = (body) => {
        setActiveUser(body)
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            const result = await changeStatus(activeUser);
            if (result?.error?.originalStatus == 200) {
                notification.success({
                    message: "Change status successfully!"
                })
                refetch();
            }
            refetch();
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Some thing wrong!"
            })
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // ham xu ly search
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                dataIndex === "full_name" ? <Link to={`details-user/${record.id}`}>{text}</Link> : text
            ),
    });

    // render - xu ly onChange 
    const columns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'full_name',
            width: "30%",
            ...getColumnSearchProps('full_name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "30%",
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
            ...getColumnSearchProps('phone_number'),
        },
        {
            title: 'Status',
            key: 'is_active',
            dataIndex: 'is_active',
            width: 150,
            align: "center",
            filters: [
                {
                    text: 'ACTIVE',
                    value: true,
                },
                {
                    text: 'INACTIVE',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.is_active === value,
            render: (_, record) => (
                <div>
                    {record.is_active === true &&
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            ACTIVE
                        </Tag>
                    }
                    {record.is_active === false &&
                        <Tag icon={<ExclamationCircleOutlined />} color="warning">
                            INACTIVE
                        </Tag>
                    }
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            align: "center",
            render: (_, record) => (
                <div>
                    {
                        record.is_active === true
                            ?
                            <Tooltip title="INACTIVE USER" color='red'>
                                <Button
                                    icon={<LockOutlined />}
                                    danger
                                    onClick={() => {
                                        showModal({
                                            userId: record.id,
                                            status: 0
                                        })
                                    }} />
                            </Tooltip>
                            :
                            <Tooltip title="ACTIVE USER" color='green'>
                                <Button
                                    icon={<UnlockOutlined />}
                                    onClick={() => {
                                        showModal({
                                            userId: record.id,
                                            status: 1
                                        })
                                    }} ></Button>
                            </Tooltip>
                    }
                </div>
            ),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='admin-manage-users-wrapper'>
            <h2 className='title'>List of users:</h2>
            <Table
                bordered={true}
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />
            <Modal
                title="Change Status Of User"
                open={isModalOpen}
                onOk={handleOk}
                confirmLoading={isLoading}
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

export default AdminManageUsers;