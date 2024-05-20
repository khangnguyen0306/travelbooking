import { Card, Col, Row } from 'antd'
import React from 'react'
import "../scss/introduction.scss"
const IntroductionHotel = () => {
    return (
        <Row gutter={[16, 16]} style={{ width: '100%' }} justify={'center'} className='introduction-hotel-layout'>
            <Col xs={24} md={6}>
                <div className="card-column">
                    <div className="card-cotainer">
                        <p></p>
                        <p></p>
                    </div>
                    <div className="card-cotainer">

                    </div>

                </div>
            </Col>
            <Col xs={24} md={10}>
                <div className="content-div">
                    Content div
                </div>
            </Col>
        </Row>

    )
}

export default IntroductionHotel