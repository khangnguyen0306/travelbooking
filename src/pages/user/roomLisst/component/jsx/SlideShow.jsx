import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import Slider from 'react-slick';
import '../scss/hotelDetail.scss';
import { DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const SlideShow = ({ bigImages, smallImages }) => {
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxVisible(true);
    };

    const closeLightbox = () => {
        setLightboxVisible(false);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? bigImages.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === bigImages.length - 1 ? 0 : prevIndex + 1));
    };

    const handleDownload = (e) => {
        e.preventDefault(); // Prevent the default behavior of the anchor tag
        const link = document.createElement('a');
        link.href = bigImages[currentImageIndex];
        link.download = `image${currentImageIndex + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };

    // if (!bigImages && !smallImages) {
    //     return <div>is loadding ... </div>
    // }


    return (
        <Row justify="center" style={{ width: '100%', marginTop: '30px' }}>
            <Col xs={24} md={12} className='image-main'>
                <Slider {...settings}>
                    {bigImages?.map((image, index) => (
                        <div key={index} onClick={() => openLightbox(index)}>
                            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
                        </div>
                    ))}
                </Slider>
            </Col>
            <Col xs={24} md={8} className="small-image">
                {smallImages?.map((image, index) => (
                    <div key={index} className='small-image-container' onClick={() => openLightbox(index)}>
                        <img src={image} alt={`Small ${index + 1}`} style={{ marginBottom: '10px' }} />
                    </div>
                ))}
            </Col>
            <Modal
                visible={lightboxVisible}
                onCancel={closeLightbox}
                footer={null}
                width="auto"
                style={{ top: 20 }}
                zIndex={1300}
            >
                <div style={{ textAlign: 'right', zIndex: '2000' }}>
                    <Button onClick={handleDownload} style={{ marginRight: '4rem' }}> Tải xuống <DownloadOutlined /></Button>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Button onClick={goToPrevious}><LeftOutlined /></Button>
                        {/* <img src={bigImages[currentImageIndex]} alt={`Lightbox ${currentImageIndex}`}
                            style={{ width: '120vh', height: '80vh', margin: '0 3rem' }} /> */}
                        <Button onClick={goToNext}><RightOutlined /></Button>
                    </div>

                </div>
            </Modal>
        </Row>
    );
};

export default SlideShow;
