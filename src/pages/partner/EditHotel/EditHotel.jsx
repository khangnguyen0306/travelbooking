import React from 'react'
import { InboxOutlined } from '@ant-design/icons';
import {
    Form,
    Upload,
    Space,
    Button,

} from 'antd';

const EditHotel = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
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
            <Form
                name="validate_other"

                onFinish={onFinish}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                    'color-picker': null,
                }}
                style={{
                    labelCol: {
                        span: 6,
                    },
                    wrapperCol: {
                        span: 14,
                    },
                    maxWidth: 600,
                }}
            >
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
                        <Button htmlType="reset">reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditHotel