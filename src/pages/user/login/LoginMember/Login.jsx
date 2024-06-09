import "./Login.scss";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link } from "react-router-dom";

const schema = yup
  .object({
    emailOrPhone: yup.string().required("This is required field.").trim(),
    password: yup.string().required("This is required field.").trim(),
  })
  .required()

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log({
      emailOrPhone: data.emailOrPhone,
      password: data.password,
      role_id: 3
    });
  }


  return (
    <div className="wrapper-login-member">
      <h1 className="title">Login for member</h1>
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
                {...register("email")}
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
          </div>
          <button className="btn">Login</button>
        </form>
        <div className="register-section">
          <h3 className="login-content-ask">
            Want to become a member?
          </h3>
          <p className="login-content-signup">
            <Link to={`/register/member`}>Register as a member</Link>
          </p>
        </div>
      </div>
      <div className="other-type-login">
        <h3 className="sub-title">Or</h3>
        <div className="link-group">
          <Link className="link" to={"/login/admin"}>Login for admin</Link>
          <Link className="link" to={"/login/partner"}>Login for partner</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;