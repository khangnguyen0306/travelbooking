import React from 'react'
import { InboxOutlined } from '@ant-design/icons';
import {
    Form,
    Upload,
} from 'antd';

const EditHotel = () => {
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <div>
            <h3 style={{ color: "red", marginBottom: "20px" }}>You can only update photos, not hotel information (hotel information is unchanged from the original you registered)</h3>
            <Form.Item label="Upload image">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger style={{ width: "400px", height: "100px" }} name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <div className="ant-upload-text">Click or drag file to this area to upload</div>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </div>
    )
}

export default EditHotel