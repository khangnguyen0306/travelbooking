import "../Member/RegisterMember.scss";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import { Spin, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../../services/authAPI";
import { useDispatch } from "react-redux";

const schema = yup
    .object({
        email: yup.string().email("This field must be a valid email").required("This is required field.").trim(),
        phone: yup.string().required("This is required field.").length(10, "Phone number must have 10 digits").trim(),
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

    const [registerUSer, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        if (data.password === data.confirmPassword) {
            const result = await registerUSer({
                role_id: 2,
                email: data.email,
                password: data.password,
                retype_password: data.confirmPassword,
                phone_number: data.phone,
            }).unwrap();
            // console.log(result);
            if (result.status == "OK") {
                // message.success(result.message);
                navigate("/login");
            } else {
                console.log(result);
                message.error(result.message);
                // form.resetFields();
            }
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
        <div className="wrapper-register-member">
            <div className="container">
                <p className="description">
                    Signing up to become a member gives you more privileges.
                </p>
                <form
                    className="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="body">
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
                    {isLoading ?
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Spin tip="Loading" size="small" style={{ textAlign: 'center' }} />
                        </div> :
                        <button className="btn" >SIGN UP</button>}

                </form>
            </div>
            <div className="footer">
                <h3 className="sub-title">Already A Member</h3>
                <Link className="link" to={"/login"}>Login</Link>
            </div>
        </div>
    );
}

export default RegisterPartner;