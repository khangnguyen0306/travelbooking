import { useEffect } from "react";
import "./Step3.scss";

function Step3() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <div className="step3-wrapper">
            <h3 className="title">Booking Completed!</h3>
            <p className="thank-you">Thank you!</p>
            <p className="note">Your booking detail has been sent to your email.</p>
        </div>
    );
}

export default Step3;