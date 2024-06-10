import React, { useState } from 'react'
import "../login/login/Login.scss"
import RegisterType from './registerType';
import { Select } from 'antd';
const Register = () => {
  const [userType, setUserType] = useState();
  const handleUserTypeChange = (event) => {
    console.log(event)
    setUserType(event);
  };
  return (
    <div className="wrapper-login-admin">
      <h1 className="title">Regiter</h1>
      <div className="item" style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: '2rem' }}>
        <p className="label">Welcome to Tabi! Please tell me what role do you want to join us?</p>
        <Select
          style={{ marginLeft: '1rem',width:'150px' }}
          className="input"
          value={userType}
          onChange={handleUserTypeChange}
          placeholder="Select your role"
        >
          <Select.Option value="2">Hotel owner</Select.Option>
          <Select.Option value="3">Customer</Select.Option>
        </Select>

      </div>
      <RegisterType userType={userType} />
    </div>
  )
}

export default Register