import React from 'react';
import './Rental.scss';
import { Link } from 'react-router-dom';

const Rental = () => {
    return (
        <div className='container-home-rental'>
            <div className="info-rental">
                <div className='title'>
                    Become A Partner
                </div>
                <div className="line"></div>
                <p className="description">
                    Becoming a hotel partner on our booking website offers many benefits for hotel owners. With a user-friendly interface and simple management tools, you can easily post hotel information, manage available rooms, and receive direct bookings. We commit to providing a stable customer base and marketing support to maximize revenue for your hotel.
                </p>
                <Link to={"/register"}><button className="button" >Discover more</button></Link>
            </div>

            <div className="img-rental">
                <img className='img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4CTQo_YrIea8Dfle4Jjh4Hf9aYTGxNePgCw&s" alt="rental" />
            </div>
        </div>
    );
}

export default Rental;
