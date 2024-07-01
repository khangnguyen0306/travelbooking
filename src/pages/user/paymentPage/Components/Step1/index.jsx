import "./Step1.scss";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { setInfoBooking } from "../../../../../slices/auth.slice";
import { useEffect } from "react";

const schema = yup
    .object({
        fullname: yup.string().required("First and last name is a required field").min(2, "First and last name must be at least 2 characters").trim(),
        email: yup.string().required("Email is a required field").email("Invalid email.").trim(),
        phone: yup.string().required("Phone is required field.").length(10, "Phone number must have 10 digits").trim(),
    })
    .required()

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

function Step1({ nextStep }) {
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const dispatch = useDispatch();
    const fullName = useSelector(state => state.auth.fullName);
    const email = useSelector(state => state.auth.email);
    const phoneNumber = useSelector(state => state.auth.phoneNumber);
    setValue("fullname", fullName);
    setValue("email", email);
    setValue("phone", phoneNumber);
    const date = useSelector(state => state.booking.date);
    const rooms = useSelector(state => state.booking.rooms);
    const hotelName = useSelector(state => state.booking.hotelName);
    const roomName = useSelector(state => state.booking.roomTypeName);
    const roomPrice = useSelector(state => state.booking.roomPrice);
    const roomImage = useSelector(state => state.booking.roomImage);

    const onSubmit = (data) => {
        dispatch(setInfoBooking({
            fullName: data.fullname,
            email: data.email,
            phoneNumber: data.phone,
        }))
        nextStep();
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <div className="step-1">
            <form
                className="info-for-guest"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="contact-info">
                    <h3 className="title">Contact information</h3>
                    <div className="fullname">
                        <p className="sub-title">First and last name</p>
                        <input
                            {...register("fullname")}
                            className="input"
                            placeholder="As in Passport/ID card/CCCD (no names/special characters)"
                        />
                        <p className="error">{errors.fullname?.message}</p>
                    </div>
                    <div className="email-phone">
                        <div className="item">
                            <p className="sub-title">Email</p>
                            <input
                                {...register("email")}
                                className="input"
                                placeholder="We will send an e-voucher to this email."
                            />
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        <div className="item">
                            <p className="sub-title">Phone number</p>
                            <input
                                {...register("phone")}
                                className="input"
                                type="tel"
                                pattern="[0]{1}[0-9]{9}"
                                placeholder="Ex: 0987654321"
                            />
                            <p className="error">{errors.phone?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="price-info">
                    <h3 className="title">Price details</h3>
                    <div className="detail-price">
                        <div className="item">
                            <span className="sub-title">Room Price</span>
                            <span className="price">{(roomPrice * rooms * daysBetween(date?.[1], date?.[0])).toLocaleString()} VND</span>
                        </div>
                    </div>
                    <div className="total-price">
                        <span className="sub-title">Total price</span>
                        <span className="price">{(roomPrice * rooms * daysBetween(date?.[1], date?.[0])).toLocaleString()} VND</span>
                    </div>
                    <button
                        className="continue"
                        type="submit"
                    >
                        Continue payment
                    </button>
                </div>
            </form>
            <div className="info-hotel-room">
                <div className="detail-info">
                    <h3 className="hotel-name">{hotelName}</h3>
                    <img
                        className="room-img"
                        src={roomImage}
                        alt="Room name"
                    />
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
                    <div className="price-detail">
                        <h3 className="room-name">({rooms} x) {roomName}</h3>
                        <span>{roomPrice?.toLocaleString()} VND</span>
                    </div>
                </div>
                <div className="detail-price">
                    <span className="title">Total Room Price</span>
                    <span className="price">{(roomPrice * rooms * daysBetween(date?.[1], date?.[0])).toLocaleString()} VND</span>
                </div>
            </div>
        </div>
    );
}

export default Step1;