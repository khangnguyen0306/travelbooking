import React, { useState, useRef } from 'react'
import "./AdminManageHotels.scss";
import { Table, Tag, Button, Popover, Modal, notification, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { useChangeStatusHotelMutation, useGetHotelForAdminQuery } from '../../../services/hotelAPI';
import { Link } from 'react-router-dom';

const AdminManageHotels = () => {
    // hook call api
    const [changeStatus, { isLoading }] = useChangeStatusHotelMutation()
    const { data, refetch } = useGetHotelForAdminQuery();

    // search in table
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [statusHotel, setStatusHotel] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ham xu ly modal
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            const result = await changeStatus(statusHotel);
            if (result.data.status == "OK") {
                notification.success({
                    message: "Change status successfully!"
                })
                refetch();
            }
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
    const getColumnSearchProps = (dataIndex, customRender) => ({
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
        onFilter: (value, record) => {
            const keys = dataIndex.split('.');
            let data = record;
            keys.forEach(key => {
                data = data[key];
            });
            return data ? data.toString().toLowerCase().includes(value.toLowerCase()) : false;
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) => {
            const keys = dataIndex.split('.');
            let data = record;
            keys.forEach(key => {
                data = data ? data[key] : null;
            });
            text = data; // update text to be the nested data

            return searchedColumn === dataIndex ? (
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
                customRender ? customRender(text, record) : text
            );
        },
    });

    // render - xu ly onChange 
    const columns = [
        {
            title: 'Hotel Name',
            dataIndex: 'hotel_name',
            key: 'hotel_name',
            ...getColumnSearchProps('hotel_name', (text, record) => (
                <Link to={`hotel-details/${record.id}`}>{text}</Link>
            )),
        },
        {
            title: 'Address',
            dataIndex: 'location.address',
            key: 'location.address',
            ...getColumnSearchProps('location.address', (text, record) => record.location.address),

        },
        {
            title: 'Province',
            dataIndex: 'location.province',
            key: 'location.province',
            ...getColumnSearchProps('location.province', (text, record) => record.location.province),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: 150,
            align: "center",
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
            width: 100,
            align: "center",
            render: (_, record) => (
                <>
                    {
                        (record.status === "APPROVED" || record.status === "REJECTED") ||
                        < Popover content={
                            < div >
                                {
                                    record.status === "PENDING" && <div>
                                        <Button
                                            className='action-item approved'
                                            icon={<CheckCircleOutlined />}
                                            onClick={() => {
                                                setStatusHotel({
                                                    hotelId: record.id,
                                                    status: `"APPROVED"`
                                                })
                                                showModal()
                                            }}
                                        >
                                            <span className='link'>APPROVED</span>
                                        </Button>
                                        <Button
                                            className='action-item rejected'
                                            icon={<CloseCircleOutlined />}
                                            onClick={() => {
                                                setStatusHotel({
                                                    hotelId: record.id,
                                                    status: `"REJECTED"`
                                                })
                                                showModal()
                                            }}
                                        >
                                            <span className='link'>REJECTED</span>
                                        </Button>
                                    </div>
                                }
                                {
                                    record.status === "ACTIVE" && <div>
                                        <Button
                                            className='action-item approved'
                                            icon={<ExclamationCircleOutlined />}
                                            onClick={() => {
                                                setStatusHotel({
                                                    hotelId: record.id,
                                                    status: `"INACTIVE"`
                                                })
                                                showModal()
                                            }}
                                        >
                                            <span className='link'>INACTIVE</span>
                                        </Button>
                                        <Button
                                            className='action-item rejected'
                                            icon={<CloseCircleOutlined />}
                                            onClick={() => {
                                                setStatusHotel({
                                                    hotelId: record.id,
                                                    status: `"CLOSED"`
                                                })
                                                showModal()
                                            }}
                                        >
                                            <span className='link'>CLOSED</span>
                                        </Button>
                                    </div>
                                }
                                {
                                    record.status === "INACTIVE" && <div>
                                        <Button
                                            className='action-item approved'
                                            icon={<CheckCircleOutlined />}
                                            onClick={() => {
                                                setStatusHotel({
                                                    hotelId: record.id,
                                                    status: `"ACTIVE"`
                                                })
                                                showModal()
                                            }}
                                        >
                                            <span className='link'>ACTIVE</span>
                                        </Button>
                                        <Button
                                            className='action-item rejected'
                                            icon={<CloseCircleOutlined />}
                                            onClick={() => {
                                                setStatusHotel({
                                                    hotelId: record.id,
                                                    status: `"CLOSED"`
                                                })
                                                showModal()
                                            }}
                                        >
                                            <span className='link'>CLOSED</span>
                                        </Button>
                                    </div>
                                }
                                {
                                    record.status === "CLOSED" && <div>
                                        <Button
                                            className='action-item approved'
                                            icon={<CheckCircleOutlined />}
                                            onClick={() => {
                                                setStatusHotel({
                                                    hotelId: record.id,
                                                    status: `"ACTIVE"`
                                                })
                                                showModal()
                                            }}
                                        >
                                            <span className='link'>ACTIVE</span>
                                        </Button>
                                    </div>
                                }
                            </div >
                        } trigger="hover" placement='left'>
                            <Button icon={<MenuOutlined />}></Button>
                        </Popover >
                    }
                </>
            ),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='admin-manage-hotels-wrapper'>
            <h2 className='title'>List of hotels:</h2>
            <Table
                bordered={true}
                columns={columns}
                dataSource={data?.data?.content}
                onChange={onChange}
            />
            <Modal
                title="Change Status Of Hotel"
                open={isModalOpen}
                confirmLoading={isLoading}
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