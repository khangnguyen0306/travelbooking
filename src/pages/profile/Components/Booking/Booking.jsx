import { Col, Row } from 'antd'
import React from 'react'

const Booking = (hasData) => {
    return (

        <div>
            {hasData ? (
                <div>

                    <h2>Booking Content Here</h2>

                </div>
            ) : (
                {/* <div>
                <Row>
                    <Col xs={24} md={4} >
                        <img src='https://ik.imagekit.io/tvlk/image/imageResource/2020/07/10/1594367281441-5ec1b573d106b7aec243b19efa02ac56.svg?tr=h-96,q-75,w-96' alt='No data' />
                    </Col>
                    <Col xs={24} md={20}>
                        <h2>No Booking Data Found</h2>
                        <h4 style={{ marginTop: '20px' }}>Every booking you book will be displayed here, looks like you haven't made any booking yet, book on the homepage now!</h4>
                    </Col>
                </Row>
            </div> */}
            )}
        </div>
    )
}

export default Booking