import React from 'react'
import './Feedback.scss'
import { UserOutlined } from '@ant-design/icons';
import { Carousel, Rate, Avatar } from 'antd';

const Feedback = () => {

    return (
        <div className='container-home-feedback'>
            <h1 className="title">
                What our customers are saying about us
            </h1>
            <Carousel autoplay className="feedback">
                <div className="feedback-item">
                    <div className="feedback-item__content">
                        <div className='heading'>
                            <div className='user'>
                                <Avatar size="large" icon={<UserOutlined />} />
                                <div className='info'>
                                    <h3 className="name">David Doe</h3>
                                    <span className="address">ha noi</span>
                                </div>
                            </div>
                            <Rate className="rating" disabled defaultValue={5} />
                        </div>
                        <div className="content">
                            The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!
                        </div>
                    </div>
                </div>
                <div className="feedback-item">
                    <div className="feedback-item__content">
                        <div className='heading'>
                            <div className='user'>
                                <Avatar size="large" icon={<UserOutlined />} />
                                <div className='info'>
                                    <h3 className="name">David Doe 2</h3>
                                    <span className="address">ha noi</span>
                                </div>
                            </div>
                            <Rate className="rating" disabled defaultValue={5} />
                        </div>
                        <div className="content">
                            The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Feedback