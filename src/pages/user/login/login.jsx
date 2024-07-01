import "./Login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../../../services/authAPI";
import { useEffect } from "react";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInfo, setToken } from "../../../slices/auth.slice"; // Adjust the import according to your project structure
import IMG from "../../../assets/photo-3-1485152074061.jpg";

const schema = yup
    .object({
        emailOrPhone: yup.string().required("This is required field.").trim(),
        password: yup.string().required("This is required field.").trim(),
    })
    .required();

function LoginAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginUserMutation();

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
            navigate('/');
        }
    }, [navigate, dispatch]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const navigateByRoles = {
        'ROLE_ADMIN': '/admin',
        'ROLE_PARTNER': '/partner',
        'ROLE_CUSTOMER': '/',
    };


    const onSubmit = async (dataObj) => {
        try {
            const result = await login({
                login_identifier: dataObj.emailOrPhone,
                password: dataObj.password,
            }).unwrap();
            if (result) {
                dispatch(setInfo({
                    userId: result?.data?.id,
                    fullName: result?.data?.fullName,
                    email: result?.data?.email,
                    phoneNumber: result?.data?.phoneNumber,
                    role: result?.data?.roles?.[0],
                }));
                dispatch(setToken(result.data.token));
                localStorage.setItem("token", result.data.token);
                const role = result?.data?.roles?.[0];
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
            notification.error({
                message: "Login error",
                description: error.message,
            });
        }
    };

    return (
        <div className="wrapper-login">
            <img className="image" src={IMG} alt="Image" />
            <div className="container">
                <form
                    className="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="title">Login</h1>

                    <div className="body">
                        {/* Email */}
                        <div className="item">
                            <p className="label">Email or Phone number</p>
                            <input
                                {...register("emailOrPhone")}
                                className="input"
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
                                placeholder="Enter password"
                            />
                            <p className="error">{errors.password?.message}</p>
                        </div>
                    </div>
                    <button className="btn">
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="register-section">
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
