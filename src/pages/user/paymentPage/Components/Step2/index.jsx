import "./Step2.scss";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";

function Step2({ backStep }) {
    const [method, setMethod] = useState("MoMo");

    const handleMomoPayment = () => {
        // Logic xử lý thanh toán Momo sẽ nằm ở đây
        alert('Redirecting to Momo...');
    };

    const handlePayAtHotel = () => {
        // Logic xử lý thanh toán Momo sẽ nằm ở đây
        alert('Redirecting to Pay at hotel...');
    }

    const handlePay = () => {
        if (method === "MoMo") {
            handleMomoPayment();
        } else if (method === "PayAtHotel") {
            handlePayAtHotel();
        }
    }

    return (
        <div className="step-2">
            <div className="select-pay-method">
                <div className="pay-methods">
                    <h2 className="title">How do you want to pay?</h2>
                    <div className="method-item" onClick={() => { setMethod("MoMo") }}>
                        <div className="name">
                            <input type="radio" checked={method === "MoMo"} />
                            <span>MoMo</span>
                        </div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png?20201011055544"
                            alt="MoMo"
                        />
                    </div>
                    <div className="method-item" onClick={() => { setMethod("PayAtHotel") }}>
                        <div className="name">
                            <input type="radio" checked={method === "PayAtHotel"} />
                            <span>Pay at hotel</span>
                        </div>
                        <img
                            src="https://logo.com/image-cdn/images/kts928pd/production/b00e2d30865932fc1c1d86658c7208810fe7911a-731x731.png?w=1080&q=72"
                            alt="Pay at hotel"
                        />
                    </div>
                </div>
                <div className="pay-section">
                    <div className="confirm-price">
                        <span>Total price</span>
                        <span>373,334 VND</span>
                    </div>
                    <button
                        className="pay-btn"
                        type="button"
                        onClick={() => {
                            handlePay();
                        }}
                    >
                        Pay
                    </button>
                    <button
                        className="back-btn"
                        type="button"
                        onClick={() => {
                            backStep();
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
            <div className="summary">
                <div className="header">
                    <h3 className="title">Payment summary</h3>
                    <p className="code">Reservation code 1149039141</p>
                </div>
                <div className="info">
                    <h3 className="hotel-name">Davue Hotel Da Nang</h3>
                    <div className="date-range">
                        <div className="check-in">
                            <p className="title">Check in</p>
                            <p className="date">Date check in</p>
                            <p className="time">From 14:00</p>
                        </div>
                        <div className="night">
                            <p className="number">Number night</p>
                            <p className="arrow">{"---------->"}</p>
                        </div>
                        <div className="check-out">
                            <p className="title">Check out</p>
                            <p className="date">Date check out</p>
                            <p className="time">Before 12:00</p>
                        </div>
                    </div>
                    <h3 className="room-name">(1x) Superior Double Room</h3>
                    <div className="guest">
                        <h3 className="title">Guest name</h3>
                        <p className="name">Nguyen Duc Thang</p>
                    </div>
                </div>
                <div className="contact-section">
                    <h3 className="title">Contact person details</h3>
                    <div className="detail">
                        <Avatar icon={<UserOutlined />} />
                        <div className="contact-info">
                            <p className="name">Nguyen Duc Thang</p>
                            <p className="phone">0987654531</p>
                            <p className="email">abc@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step2;