import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Upload,
    Form,
    Input,
    Radio,
    DatePicker,
    Select,
} from 'antd';
import { Countries } from '../../../../utils/utils';

const { Option } = Select;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const Profile = () => {
    const [form] = Form.useForm();
    const dateFormat = 'DD/MM/YYYY';

    const handleSubmit = (values) => {
        console.log('Form values:', values);
    };

    return (
        <>
            <h1 style={{ marginBottom: 50 }}>Edit Profile</h1>
            <Form
                size='large'
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    size='large'
                    style={{ fontSize: '18px' }}
                    label="Change Avatar"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item style={{ fontSize: '18px' }} size='large' label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
                    <Radio.Group>
                        <Radio value="female">Female</Radio>
                        <Radio value="male">Male</Radio>
                        <Radio value="other">Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item size='large' label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item size='large' label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item size='large' label="Birth Date" name="birthDate" rules={[{ required: true, message: 'Please select your birth date!' }]}>
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item size='large' label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item size='large' label="Phone" name="phone" rules={[{ required: true, message: 'Please enter your phone number!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item size='large' label="Country" name="country" rules={[{ required: true, message: 'Please select your country!' }]}>
                    <Select>
                        {Countries.map((country, index) => (
                            <Option key={index} value={country}>
                                {country}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item size='large' wrapperCol={{ offset: 6, span: 16 }}>
                    <Button style={{ marginLeft: "-50px" }} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Profile;
