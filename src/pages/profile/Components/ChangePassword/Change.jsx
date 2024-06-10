import { Form, Input, Button } from 'antd';
import React from 'react';
import './Change.scss';

const Change = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('pass:', values);
    };
    return (
        <div className="form-container">
            <h1 className="form-title">Change Password</h1>
            <Form
                size='large'
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 900 }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    className='form-item'
                    size='large'
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                        { required: true, message: 'Please enter your current password!' },
                        { pattern: /^.{6,24}$/, message: 'Password must be between 6 and 24 characters!' }
                    ]}
                >
                    <Input.Password className='input' />
                </Form.Item>
                <Form.Item
                    className='form-item'
                    size='large'
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Please enter your new password!' },
                        { pattern: /^.{6,24}$/, message: 'Password must be between 6 and 24 characters!' }
                    ]}
                >
                    <Input.Password className='input' />
                </Form.Item>
                <Form.Item
                    className='form-item'
                    size='large'
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please enter your confirm password!' },
                        { pattern: /^.{6,24}$/, message: 'Password must be between 6 and 24 characters!' }
                    ]}
                >
                    <Input.Password className='input' />
                </Form.Item>

                <Form.Item size='large' wrapperCol={{ offset: 6, span: 16 }}>
                    <Button style={{ marginLeft: "-75px" }} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Change;
