import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Form, Upload, Space, Button, notification } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { hotelApi } from "../../../services/hotelAPI";

const EditHotel = () => {
    const { id } = useParams(); // Lấy hotelId từ URL

    const [fileList, setFileList] = useState([]);
    const [putImage] = hotelApi.usePutHotelImageMutation();
    const [form] = Form.useForm(); // Tạo instance của form
    const handleReset = () => {
        form.resetFields(); // Reset form về trạng thái ban đầu
        setFileList([]); // Xóa danh sách file
    };
    const onFinish = async () => {

        if (fileList.length < 4) {
            notification.error({
                message: "Error",
                description: "You must upload at least 4 images.",
            });
            return;
        }

        const formData = new FormData();
        fileList.forEach(file => {
            formData.append("images", file.originFileObj);
        });

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        try {
            await putImage({ idHotel: id, images: fileList }).unwrap();
            notification.success({
                message: "Success",
                description: "Hotel image upload successfully!",
            });
        } catch (error) {
            notification.error({
                message: "Error",
                description: "Failed to upload hotel image.",
            });
        }
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

    return (
        <div>
            <h3 style={{ color: "red", marginBottom: "20px" }}>
                You can only update photos and status, not hotel information (hotel information is unchanged from the original you registered)
            </h3>
            <Form
                name="validate_other"
                onFinish={onFinish}
                style={{
                    labelCol: { span: 6 },
                    wrapperCol: { span: 14 },
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    label="Upload image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload.Dragger
                        name="files"
                        beforeUpload={() => false} // Prevent automatic upload
                        fileList={fileList}
                        onChange={handleChange}
                        listType="picture"
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <div className="ant-upload-text">Click or drag file to this area to upload</div>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 12,
                        offset: 6,
                    }}
                >
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={handleReset}>Reset</Button>
                        <Link to={'/partner/manage-hotel'}>
                            <Button danger>Cancel</Button>
                        </Link>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditHotel;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
