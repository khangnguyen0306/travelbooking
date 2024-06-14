import React, { useState } from 'react'
import "./Register.scss"
import IMG from "../../../assets/photo-3-1485152074061.jpg";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Spin, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../services/authAPI";

const schema = yup
  .object({
    role_id: yup.number().required(),
    full_name: yup.string().required("This is required field.").trim(),
    email: yup.string().email("This field must be a valid email").required("This is required field.").trim(),
    phone_number: yup.string().required("This is required field.").length(10, "Phone number must have 10 digits").trim(),
    password: yup.string().required("This is required field.").min(6, "Password must be at least 6 characters.").max(24, "Password must be at most 24 characters.").trim(),
    retype_password: yup.string().required("This is required field.").min(6, "Confirm password must be at least 6 characters.").max(24, "Confirm password must be at most 24 characters.").trim(),
    check: yup.boolean().required().isTrue("Please check the box."),
  })
  .required()

const Register = () => {
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
    if (data.password === data.retype_password) {
      const result = await registerUSer({
        role_id: data.role_id,
        full_name: data.full_name,
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
        retype_password: data.retype_password,
      }).unwrap();
      // console.log(result);
      if (result.status == "OK") {
        navigate("/login");
      } else {
        console.log(result);
        message.error(result.message);
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
    <div className="wrapper-register">
      <div className="container">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="title">Register</h1>
          <div className="body">
            {/* Role */}
            <div className="item">
              <p className="label">Register as</p>
              <select
                {...register("role_id")}
                className="input"
              >
                <option value="2">Customer</option>
                <option value="3">Hotel owner</option>
              </select>
              <p className="error">{errors.role_id?.message}</p>
            </div>
            {/* Fullname */}
            <div className="item">
              <p className="label">Fullname</p>
              <input
                {...register("full_name")}
                className="input"
                autoComplete="off"
                placeholder="Ex: Nguyen Van A"
              />
              <p className="error">{errors.full_name?.message}</p>
            </div>
            {/* Email */}
            <div className="item">
              <p className="label">Email</p>
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
              <p className="label">Phone</p>
              <input
                {...register("phone_number")}
                className="input"
                type="tel"
                pattern="[0]{1}[0-9]{9}"
                autoComplete="off"
                placeholder="Ex: 0987654321"
              />
              <p className="error">{errors.phone_number?.message}</p>
            </div>
            {/* Password */}
            <div className="item">
              <p className="label">Password</p>
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
              <p className="label">Confirm Password</p>
              <input
                {...register("retype_password")}
                className="input"
                type="password"
                autoComplete="off"
                placeholder="Ex: ************ (6-24 characters)"
              />
              <p className="error">{errors.retype_password?.message}</p>
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
        <div className="login-section">
          <h3 className="ask">Already A Member</h3>
          <p className='login-link'><Link to={"/login"}>Login</Link></p>
        </div>
      </div>
      <img className="image" src={IMG} alt="Image" />
    </div>
  )
}

export default Register