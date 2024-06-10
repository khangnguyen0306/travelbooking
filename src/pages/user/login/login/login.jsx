import "./Login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../../../../services/authAPI";
import { useState } from "react";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../../slices/auth.slice"; // Adjust the import according to your project structure

const schema = yup
    .object({
        emailOrPhone: yup.string().required("This is required field.").trim(),
        password: yup.string().required("This is required field.").trim(),
        role: yup.string().required("This is a required field."),
    })
    .required();

function LoginAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginUserMutation();
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const getRoleId = (role) => {
        switch (role) {
            case 'admin':
                return 1;
            case 'partner':
                return 2;
            case 'user':
                return 3;
            default:
                return 3;
        }
    };

    const navigateByRoles = {
        'ROLE_ADMIN': '/admin',
        'ROLE_PARTNER': '/partner',
        'ROLE_CUSTOMER': '/',
    };


    const onSubmit = async (dataObj) => {
        try {
            const result = await login({
                phone_number: dataObj.emailOrPhone,
                password: dataObj.password,
                role_id: getRoleId(dataObj.role)
            }).unwrap();
            console.log(result);
            if (result) {
                dispatch(setUser(result.data.roles));
                console.log(result.data.roles)
                dispatch(setToken(result.data.token));
                localStorage.setItem("token", result.data.token);
                const role = result.data.roles[0];
                const defaultPath = navigateByRoles[role] || "/";
                const from = location.state?.from?.pathname || defaultPath;
                navigate(from);
                notification.success({
                    message: "Login successfully",
                    description:
                        <div>
                            Welcome {result.data.userName} <SmileOutlined />
                        </div>,
                });
            } else {
                notification.error({
                    message: "Login error",
                    description: "Invalid email or password. Try again!",
                });
                reset(); // Clear input fields
            }
        } catch (error) {
            setError("An error occurred while attempting to log in");
            notification.error({
                message: "Login error",
                description: error.message,
            });
        }
    };

    return (
        <div className="wrapper-login-admin">
            <h1 className="title">Login</h1>
            <div className="container">
                <form
                    className="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="body">
                        {/* Email */}
                        <div className="item">
                            <p className="label">Email or Phone number</p>
                            <input
                                {...register("emailOrPhone")}
                                className="input"
                                autoComplete="off"
                                placeholder="Enter email or phone number"
                            />
                            <p className="error">{errors.emailOrPhone?.message}</p>
                        </div>
                        {/* Password */}
                        <div className="item">
                            <p className="label">Password</p>
                            <input
                                {...register("password")}
                                className="input"
                                type="password"
                                autoComplete="off"
                                placeholder="Enter password"
                            />
                            <p className="error">{errors.password?.message}</p>
                        </div>
                        {/* Role */}
                        <div className="item">
                            <p className="label">You are</p>
                            <select
                                {...register("role")}
                                className="input"
                            >
                                <option value="">Select your role</option>
                                <option value="admin">Admin</option>
                                <option value="partner">Hotel owner</option>
                                <option value="user">Customer</option>
                            </select>
                            <p className="error">{errors.role?.message}</p>
                        </div>
                    </div>

                    <button className="btn">
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="register-section" style={{marginBottom:'2rem'}}>
                    <h3 className="login-content-ask">
                        Want to become a member?
                    </h3>
                    <p className="login-content-signup">
                        <Link to={`/register`}>Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;
