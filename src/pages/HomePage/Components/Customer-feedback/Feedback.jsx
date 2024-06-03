import React from 'react'
import './Feedback.scss'
import { UserOutlined } from '@ant-design/icons';
import { Carousel, Col, Row, Rate, Avatar } from 'antd';

const Feedback = () => {

    return (
        <div className='container-home-feedback'>
            <h1 className="title">
                What our customers are saying about us
            </h1>
            <Carousel arrows className="feedback">
                <div className="feedback-item">
                    <Row>
                        <Col xs={24} md={2}>
                            <div className="feedback-item__image">
                                <Avatar size="large" icon={<UserOutlined />} />
                            </div>
                        </Col>
                        <Col xs={24} md={22}>
                            <div className="feedback-item__content">
                                <Row style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
                                    <Col xs={24} md={12}>
                                        <span className="feedback-item__content__name">David Doe</span>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <div className="feedback-item__content__rating">
                                            <Rate disabled defaultValue={5} />
                                        </div>
                                    </Col>
                                </Row>
                                <div className="feedback-item__content__role">ha noi</div>
                                <div className="feedback-item__content__text">The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!</div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </Carousel>
        </div>
    )
}

export default Feedback