import "./BookingForm.scss";
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRoomInfo } from "../../../../../slices/bookingSlice";

function BookingForm({ data }) {
    const token = useSelector(state => state?.auth?.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClickBooking = () => {
        dispatch(setRoomInfo({
            roomTypeId: data?.id,
            roomTypeName: data?.room_type_name,
            roomPrice: data?.room_price,
            roomImage: data?.image_urls?.[0]?.image_url
        }));
        if (!token) {
            setIsModalOpen(!isModalOpen)
        } else {
            navigate("/payment")
        }
    }
    return (
        <>
            <div className="form-booking" >
                <span className="title">Book Your Room</span>
                <button
                    className="btn add-to-cart"
                    type="button"
                >
                    ADD TO CART
                </button>
                <button
                    className="btn"
                    onClick={handleClickBooking}
                >
                    BOOK NOW
                </button>
            </div>
            {/* modal */}
            <Modal
                className="modal"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(!isModalOpen);
                }}
                centered={true}
                footer={false}
            >
                <h3 className="title">PROCEED BOOKING</h3>
                <div className="border"></div>
                <div className="member">
                    <div className="item">
                        <h3 className="sub-title">ALREADY A MEMBER?</h3>
                        <Link className="btn" to={"/login"}>Sign In!</Link>
                    </div>
                    <div className="item">
                        <h3 className="sub-title">DON'T HAVE AN ACCOUNT? CREATE ONE.</h3>
                        <Link className="btn sign-up" to={"/register"}>Sign Up</Link>
                    </div>
                </div>
                <div className="border"></div>
                <div className="guest">
                    <h3 className="sub-title">OR CONTINUE AS GUEST</h3>
                    <Link className="btn" to={"/payment"}>Continue As Guest</Link>
                </div>
            </Modal>
        </>
    );
}

export default BookingForm;