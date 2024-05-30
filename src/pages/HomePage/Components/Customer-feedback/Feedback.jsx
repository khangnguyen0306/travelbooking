import React from 'react'
import './Feedback.scss'
import { UserOutlined } from '@ant-design/icons';
import { Carousel, Col, Row, Rate, Avatar } from 'antd';
const contentStyle = {
    margin: 0,
    height: '260px',
    color: '#000000',
    // lineHeight: '160px',
    // textAlign: 'center',
    background: '#e1e1e1',
};

// const feedbacks = [
//     {
//         name: "David Doe",
//         role: "Traveler",
//         text: "The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!",
//         rating: 5,
//         image: "path/to/david-doe-image.jpg"
//     },
//     {
//         name: "Brittany Clark",
//         role: "San Francisco",
//         text: "The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!",
//         rating: 4,
//         image: "path/to/brittany-clark-image.jpg"
//     },
//     // Thêm các feedback khác ở đây
// ];

const Feedback = () => {

    return (
        <div className='container-home-feedback'>
            <div className="title">
                What our customers are saying about us
            </div>
            <div className="feedback">
                <Carousel>
                    <div>
                        <div style={contentStyle}>
                            <div className="feedback-item">
                                <Row>
                                    <Col xs={24} md={2}>
                                        <div className="feedback-item__image">
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        </div>
                                    </Col>
                                    <Col xs={24} md={22}>
                                        <div className="feedback-item__content">
                                            <div className="feedback-item__content__name">David Doe</div>
                                            <Row>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__role">ha noi</div>

                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__rating">
                                                        <Rate disabled defaultValue={5} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="feedback-item__content__text">The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!</div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={contentStyle}>
                            <div className="feedback-item">
                                <Row>
                                    <Col xs={24} md={2}>
                                        <div className="feedback-item__image">
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        </div>
                                    </Col>
                                    <Col xs={24} md={22}>
                                        <div className="feedback-item__content">
                                            <div className="feedback-item__content__name">David Doe</div>
                                            <Row>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__role">ha noi</div>

                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__rating">
                                                        <Rate disabled defaultValue={5} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="feedback-item__content__text">The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!</div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={contentStyle}>
                            <div className="feedback-item">
                                <Row>
                                    <Col xs={24} md={2}>
                                        <div className="feedback-item__image">
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        </div>
                                    </Col>
                                    <Col xs={24} md={22}>
                                        <div className="feedback-item__content">
                                            <div className="feedback-item__content__name">David Doe</div>
                                            <Row>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__role">ha noi</div>

                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__rating">
                                                        <Rate disabled defaultValue={5} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="feedback-item__content__text">The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!</div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={contentStyle}>
                            <div className="feedback-item">
                                <Row>
                                    <Col xs={24} md={2}>
                                        <div className="feedback-item__image">
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        </div>
                                    </Col>
                                    <Col xs={24} md={22}>
                                        <div className="feedback-item__content">
                                            <div className="feedback-item__content__name">David Doe</div>
                                            <Row>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__role">ha noi</div>

                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <div className="feedback-item__content__rating">
                                                        <Rate disabled defaultValue={5} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="feedback-item__content__text">The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!</div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Feedback