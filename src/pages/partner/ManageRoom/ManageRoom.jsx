import React, { useState, useRef } from 'react'
import "./ManageRoom.scss"
import { Table, Tag, Button, Popover, Modal, notification, Input, Space } from 'antd';
import {
    SearchOutlined,
    PlusCircleOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { roomApi } from '../../../services/roomAPI';

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const ManageRoom = () => {
    const { id } = useParams();
    const { data, refetch } = roomApi.useGetAllRoomQuery(id);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
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

    const columns = [
        {
            title: 'Room Type',
            dataIndex: 'room_type_name',
            key: 'room_type_name',
            ...getColumnSearchProps('room_type_name', (text, record) => (
                <Link to={`hotel-details/${record.id}`}>{text}</Link>
            )),
        },

        {
            title: 'Number Of Rooms',
            dataIndex: 'number_of_rooms',
            key: 'number_of_rooms',
            sorter: (a, b) => a.number_of_rooms - b.number_of_rooms,
        },
        {
            title: 'Price',
            dataIndex: 'room_price',
            key: 'room_price',
            ...getColumnSearchProps('room_price', (text, record) => record.room_price),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'UNAVAILABLE',
                    value: 'UNAVAILABLE',
                },
                {
                    text: 'DISABLED',
                    value: 'DISABLED',
                },
                {
                    text: 'AVAILABLE',
                    value: 'AVAILABLE',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, record) => (
                <div>
                    {record.status === "AVAILABLE" &&
                        < Tag icon={<CheckCircleOutlined />} color="success">
                            {record.status}
                        </Tag>
                    }
                    {record.status === "UNAVAILABLE" &&
                        < Tag icon={< SyncOutlined spin />} color="processing" >
                            {record.status}
                        </Tag >
                    }
                    {record.status === "DISABLED" &&
                        < Tag icon={< CloseCircleOutlined />} color="error" >
                            {record.status}
                        </Tag >
                    }
                </div >
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            render: (_, record) => (
                < Popover content={
                    < div >
                        <Link className='link' to={`${record.id}/update`}>
                            <Button
                                className='action-item'
                                icon={<EditOutlined />}
                            >
                                Update
                            </Button>
                        </Link>

                        <Link className='link' to={`${record.id}/delete`}>
                            <Button
                                className='action-item'
                                icon={<DeleteOutlined />}
                            >
                                Delete
                            </Button>
                        </Link>
                    </div >
                } trigger="hover" placement='left'>
                    <Button icon={<MenuOutlined />}></Button>
                </Popover>
            ),
        },
    ];

    return (
        <div className='manage-hotel-wrapper'>
            <p><h2 className='title'>Manage Rooms</h2></p>
            <div className="action">
                <Link className="new-btn" to={"create-room"}>
                    <PlusCircleOutlined />
                    New Room
                </Link>
            </div>
            <Table
                bordered={true}
                columns={columns}
                dataSource={data?.data?.content || []}
                onChange={onChange}
                scroll={{
                    y: 440,
                }}
            />

        </div>
    )
}

export default ManageRoom