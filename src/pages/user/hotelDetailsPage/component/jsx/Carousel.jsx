import React, { useEffect, useRef } from 'react';
import "../scss/Carousel.scss"
import { Image } from 'antd';

const Carousel = ({ images }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        let interval = setInterval(() => {
            container.scrollLeft += 612; // Điều chỉnh tốc độ cuộn ở đây
            if (Math.ceil(container.scrollLeft) >= container.scrollWidth - container.clientWidth) {
                container.scrollLeft = 0; // Quay lại đầu khi cuộn tới cuối
            }
        }, 2000); // Khoảng thời gian giữa các lần cuộn (milliseconds)

        // Dừng interval khi component unmount
        return () => clearInterval(interval);

    }, []); // Chỉ chạy một lần khi component mount

    return (
        <div className="slideshow" ref={containerRef}>
            <Image.PreviewGroup>
                {images?.map((image) => (
                    <Image className='hotel-img' src={image?.url} alt={""} />
                ))}
            </Image.PreviewGroup>
        </div>
    );
};

export default Carousel;