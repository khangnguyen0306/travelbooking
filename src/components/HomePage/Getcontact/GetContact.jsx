import { Col, Row } from 'antd'
import React from 'react'
import "./GetContact.scss"
import { BellFilled } from '@ant-design/icons'
const getContact = () => {
    return (
        <Row justify={"center"} align={'middle'} className="Home-getcontact-layout" >
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Col xs={24} md={9}>
                    <div className='left-getcontact'>
                        <p className='left-getcontact-title'>Discover Special Deals!</p>
                        <p className='left-getcontact-content'>Make sure to check out these special promotions</p>
                        <button className='left-getcontact-btn'>See Tours</button>
                    </div>
                </Col>
                <Col xs={24} md={9}>
                    <div className='right-getcontact' >
                        <p className='right-getcontact-title'>Don’t miss a thing</p>
                        <div className='right-getcontact-content'>
                            <p >Get update to special deals and exclusive offers.</p>
                            <p >Sign up to our newsletter!</p>

                        </div>
                        <div className='right-getcontact-btn-container'>
                            <div>
                            <span><BellFilled /></span>
                            <input placeholder='Your Email Address' className='right-getcontact-input'></input>
                            </div>
                            <button className='right-getcontact-btn'>SUBCRIBE</button>
                        </div>
                    </div>
                </Col>
            </div>
        </Row>
    )
}

export default getContact