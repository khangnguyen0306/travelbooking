import "./Step1.scss";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";

const schema = yup
    .object({
        fullname: yup.string().required("First and last name is a required field").min(2, "First and last name must be at least 2 characters").trim(),
        email: yup.string().required("Email is a required field").email("Invalid email.").trim(),
        phone: yup.string().required("Phone is required field.").length(10, "Phone number must have 10 digits").trim(),
        guestFullname: yup.string().min(2, "Fullname must be at least 2 characters").trim(),
    })
    .required()

function Step1({ nextStep }) {
    const {
        setValue,
        getValues,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        console.log(data);
        nextStep();
    }

    const [type, setType] = useState(0);

    return (
        <div className="step-1">
            <form
                className="info-for-guest"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="contact-info">
                    <h3 className="title">Contact information (for E-voucher)</h3>
                    <p className="description">Please fill in all information correctly to ensure you receive your booking confirmation (E-voucher) via email.</p>
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
                    <div className="book-for">
                        <div
                            className="selection"
                            onClick={() => {
                                setType(0);
                                setValue("guestFullname", getValues("fullname"))
                            }}
                        >
                            <input type="radio" checked={type === 0} />
                            <span>I am a guest</span>
                        </div>
                        <div
                            className="selection"
                            onClick={() => {
                                setType(1);
                                setValue("guestFullname", "")
                            }}
                        >
                            <input type="radio" checked={type === 1} />
                            <span>I'm booking for someone else</span>
                        </div>
                    </div>
                    {
                        type === 1 &&
                        <div className="guest-fullname">
                            <p className="sub-title">Guest's full name</p>
                            <input
                                {...register("guestFullname")}
                                className="input"
                                placeholder="Enter the name of the guest who will be staying."
                            />
                            <p className="error">{errors.guestFullname?.message}</p>
                        </div>
                    }
                </div>
                <div className="price-info">
                    <h3 className="title">Price details</h3>
                    <div className="detail-price">
                        <div className="item">
                            <span className="sub-title">Room Rates</span>
                            <span className="price">329,218 VND</span>
                        </div>
                        <div className="item">
                            <span className="sub-title">Taxes and fees</span>
                            <span className="price">44,115 VND</span>
                        </div>
                    </div>
                    <div className="total-price">
                        <span className="sub-title">Total price</span>
                        <span className="price">373,333 VND</span>
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
                    <h3 className="hotel-name">Hotel name</h3>
                    <img
                        className="room-img"
                        src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/collov-home-design-LSpkE5OCD_8-unsplash-900x500.jpg"
                        alt="Room name"
                    />
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
                    <h3 className="room-name">(Number x) Room name</h3>
                </div>
                <div className="detail-price">
                    <span className="title">Total Room Price</span>
                    <span className="price">336,000 VND</span>
                </div>
            </div>
        </div>
    );
}

export default Step1;