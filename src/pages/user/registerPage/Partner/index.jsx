import "./RegisterPartner.scss";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import { notification } from "antd";
import { Link } from "react-router-dom";

const schema = yup
    .object({
        username: yup.string().required("This is required field.").min(6, "Username must be at least 6 characters.").max(12, "Username must be at most 12 characters.").trim(),
        email: yup.string().email("This field must be a valid email").required("This is required field.").trim(),
        phone: yup.string().required("This is required field.").length(10, "Phone number must have 10 digits").trim(),
        address: yup.string().required("This is required field.").trim(),
        password: yup.string().required("This is required field.").min(6, "Password must be at least 6 characters.").max(24, "Password must be at most 24 characters.").trim(),
        confirmPassword: yup.string().required("This is required field.").min(6, "Confirm password must be at least 6 characters.").max(24, "Confirm password must be at most 24 characters.").trim(),
        check: yup.boolean().required().isTrue("Please check the box."),
    })
    .required()

function RegisterPartner() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            console.log({
                username: data.username,
                email: data.email,
                phone: data.phone,
                address: data.address,
                password: data.password,
                confirmPassword: data.confirmPassword,
            });
            notification.success({
                message: "Sign up successfully!",
                description: "Please login to continue."
            })
            reset();
        } else {
            notification.error({
                message: "Password and confirm password does not match!"
            })
        }
    }

    const [checked, setChecked] = useState(false);

    return (
        <div className="wrapper">
            <h1 className="title">Register as a partner</h1>
            <div className="container">
                <p className="description">
                    After creating an account, you'll be able to track your payment status, track the confirmation and you can also rate the tour after you finished the tour.
                </p>
                <form
                    className="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="body">
                        {/* Username */}
                        <div className="item">
                            <p className="label">Username*</p>
                            <input
                                {...register("username")}
                                className="input"
                                autoComplete="off"
                                placeholder="Ex: username123 (6-12 characters)"
                            />
                            <p className="error">{errors.username?.message}</p>
                        </div>
                        {/* Email */}
                        <div className="item">
                            <p className="label">Email*</p>
                            <input
                                {...register("email")}
                                className="input"
                                autoComplete="off"
                                placeholder="Ex: username@gmail.com"
                            />
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        {/* Phone */}
                        <div className="item">
                            <p className="label">Phone*</p>
                            <input
                                {...register("phone")}
                                className="input"
                                type="tel"
                                pattern="[0]{1}[0-9]{9}"
                                autoComplete="off"
                                placeholder="Ex: 0987654321"
                            />
                            <p className="error">{errors.phone?.message}</p>
                        </div>
                        {/* Address */}
                        <div className="item">
                            <p className="label">Address*</p>
                            <input
                                {...register("address")}
                                className="input"
                                autoComplete="off"
                                placeholder="Ex: Ho Chi Minh City"
                            />
                            <p className="error">{errors.address?.message}</p>
                        </div>
                        {/* Password */}
                        <div className="item">
                            <p className="label">Password*</p>
                            <input
                                {...register("password")}
                                className="input"
                                type="password"
                                autoComplete="off"
                                placeholder="Ex: ************ (6-24 characters)"
                            />
                            <p className="error">{errors.password?.message}</p>
                        </div>
                        {/* Confirm Password */}
                        <div className="item">
                            <p className="label">Confirm Password*</p>
                            <input
                                {...register("confirmPassword")}
                                className="input"
                                type="password"
                                autoComplete="off"
                                placeholder="Ex: ************ (6-24 characters)"
                            />
                            <p className="error">{errors.confirmPassword?.message}</p>
                        </div>
                    </div>
                    <div className="policy">
                        <input
                            {...register("check")}
                            className="checkbox"
                            type="checkbox"
                            onChange={() => {
                                setChecked(!checked)
                            }}
                            value={checked}
                        />
                        * Creating an account means you're okay with our <a>Terms of Service</a> and <a>Privacy Statement</a>.
                        <p className="error">{errors.check?.message}</p>
                    </div>

                    <button className="btn">SIGN UP</button>
                </form>
            </div>
            <div className="footer">
                <h3 className="sub-title">Already A Partner</h3>
                <Link className="link" to={"/login/partner"}>Login</Link>
            </div>
        </div>
    );
}

export default RegisterPartner;