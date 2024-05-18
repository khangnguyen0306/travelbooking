import React from 'react'
import './Feedback.scss'


const feedbacks = [
    {
        name: "David Doe",
        role: "Traveler",
        text: "The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!",
        rating: 5,
        image: "path/to/david-doe-image.jpg"
    },
    {
        name: "Brittany Clark",
        role: "San Francisco",
        text: "The tours in this website are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!",
        rating: 4,
        image: "path/to/brittany-clark-image.jpg"
    },
    // Thêm các feedback khác ở đây
];

const Feedback = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className='container-home-feedback'>
            <div className="title">
                What our customers are saying about us
            </div>
            <div className="feedback">
                {/* <Slider {...settings}> */}
                {feedbacks.map((feedback, index) => (
                    <div key={index} className="feedback-item">
                        <div className="feedback-content">
                            <img src={feedback.image} alt={feedback.name} className="feedback-image" />
                            <div className="feedback-details">
                                <h3>{feedback.name}</h3>
                                <p className="role">{feedback.role}</p>
                                <p>{feedback.text}</p>
                                <div className="rating">
                                    {'★'.repeat(feedback.rating)}
                                    {'☆'.repeat(5 - feedback.rating)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* </Slider> */}
            </div>
        </div>
    )
}

export default Feedback