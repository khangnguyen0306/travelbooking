import "./PaymentPage.scss";
import { useEffect, useState } from "react";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import { Steps } from 'antd';

function PaymentPage() {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const steps = [
        {
            title: 'Customer information',
            content: <Step1 nextStep={() => { next() }} />,
        },
        {
            title: 'Detail payment',
            content: <Step2 backStep={() => { prev() }} />,
        },
        {
            title: 'Booking confirmed!',
            content: <Step3 />,
        },
    ];
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <div className="payment-wrapper">
            <div className="container">
                <h1 className="heading">Payment Page</h1>
                <Steps className="progress" current={current} items={items} />
                <div>{steps[current].content}</div>
            </div>
        </div>
    );
}

export default PaymentPage;