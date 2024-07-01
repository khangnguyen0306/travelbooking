import "./Step2.scss";
import { Avatar, notification } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateBookingMutation } from "../../../../../services/bookingAPI";

function daysBetween(date1, date2) {
    // Chuyển đổi các chuỗi ngày thành đối tượng Date
    var d1 = new Date(date1);
    var d2 = new Date(date2);

    // Lấy thời gian dưới dạng mili giây
    var time1 = d1.getTime();
    var time2 = d2.getTime();

    // Tính hiệu số giữa hai ngày
    var timeDifference = Math.abs(time2 - time1);

    // Chia cho số mili giây trong một ngày
    var dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return dayDifference;
}

function Step2({ backStep }) {
    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const userId = useSelector(state => state.auth.userId);
    const fullName = useSelector(state => state.auth.fullName);
    const email = useSelector(state => state.auth.email);
    const phoneNumber = useSelector(state => state.auth.phoneNumber);
    const date = useSelector(state => state.booking.date);
    const rooms = useSelector(state => state.booking.rooms);
    const hotelName = useSelector(state => state.booking.hotelName);
    const roomName = useSelector(state => state.booking.roomTypeName);
    const roomTypeId = useSelector(state => state.booking.roomTypeId);
    const roomPrice = useSelector(state => state.booking.roomPrice);

    const [method, setMethod] = useState("VNPay");

    const handleVNPayPayment = async () => {
        try {
            // Logic xử lý thanh toán VNPay sẽ nằm ở đây
            alert('Redirecting to VNPay...');
            let result = null;
            if (userId != null) {
                result = await createBooking({
                    "note": "",
                    "total-price": (roomPrice * rooms * daysBetween(date?.[1], date?.[0])),
                    "check-in-date": date?.[0],
                    "check-out-date": date?.[1],
                    "coupon-id": 0,
                    "user-id": userId,
                    "full-name": fullName,
                    "phone-number": phoneNumber,
                    "email": email,
                    "booking-date": new Date().toISOString(),
                    "payment-method": "VNPay",
                    "booking-details": [
                        {
                            "price": roomPrice,
                            "room-type-id": roomTypeId,
                            "number-of-rooms": rooms,
                            "total-money": (roomPrice * rooms * daysBetween(date?.[1], date?.[0]))
                        }
                    ]
                })
            } else {
                result = await createBooking({
                    "note": "",
                    "total-price": (roomPrice * rooms * daysBetween(date?.[1], date?.[0])),
                    "check-in-date": date?.[0],
                    "check-out-date": date?.[1],
                    "coupon-id": 0,
                    "full-name": fullName,
                    "phone-number": phoneNumber,
                    "email": email,
                    "booking-date": new Date().toISOString(),
                    "payment-method": "VNPay",
                    "booking-details": [
                        {
                            "price": roomPrice,
                            "room-type-id": roomTypeId,
                            "number-of-rooms": rooms,
                            "total-money": (roomPrice * rooms * daysBetween(date?.[1], date?.[0]))
                        }
                    ]
                })
            }
            if (result) {
                console.log(result);
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.message,
            });
        }
    };

    const handlePay = () => {
        if (method === "VNPay") {
            handleVNPayPayment();
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <div className="step-2">
            <div className="select-pay-method">
                <div className="pay-methods">
                    <h2 className="title">How do you want to pay?</h2>
                    <div className="method-item" onClick={() => { setMethod("VNPay") }}>
                        <div className="name">
                            <input type="radio" checked={method === "VNPay"} onChange={() => { setMethod("VNPay") }} />
                            <span>VNPay</span>
                        </div>
                        <img
                            src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/202166185_2021396718013233_8499389898242103910_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=YPBxuAYbS5wQ7kNvgFImShE&_nc_ht=scontent.fsgn2-11.fna&oh=00_AYBz5KPt9eFfR5ui8AOFpmQ09cNyTES9Lwra4U1KKOL4mg&oe=66889B29"
                            alt="VNPay"
                        />
                    </div>
                </div>
                <div className="pay-section">
                    <div className="confirm-price">
                        <span>Total price</span>
                        <span>{(roomPrice * rooms * daysBetween(date?.[1], date?.[0])).toLocaleString()} VND</span>
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
                </div>
                <div className="info">
                    <h3 className="hotel-name">{hotelName}</h3>
                    <div className="date-range">
                        <div className="check-in">
                            <p className="title">Check in</p>
                            <p className="date">{date?.[0]?.slice(8, 10)}-{date?.[0]?.slice(5, 7)}-{date?.[0]?.slice(0, 4)}</p>
                            <p className="time">From 14:00</p>
                        </div>
                        <div className="night">
                            <p className="number">{daysBetween(date?.[1], date?.[0])} night(s)</p>
                            <p className="arrow">{"---------->"}</p>
                        </div>
                        <div className="check-out">
                            <p className="title">Check out</p>
                            <p className="date">{date?.[1]?.slice(8, 10)}-{date?.[1]?.slice(5, 7)}-{date?.[1]?.slice(0, 4)}</p>
                            <p className="time">Before 12:00</p>
                        </div>
                    </div>
                    <h3 className="room-name">({rooms}x) {roomName}</h3>
                </div>
                <div className="contact-section">
                    <h3 className="title">Contact person details</h3>
                    <div className="detail">
                        <Avatar icon={<UserOutlined />} />
                        <div className="contact-info">
                            <p className="name">{fullName}</p>
                            <p className="phone">{phoneNumber}</p>
                            <p className="email">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step2;