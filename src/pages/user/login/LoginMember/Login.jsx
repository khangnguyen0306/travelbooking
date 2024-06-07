import "./Login.scss";
import { Input, Button, Typography, notification, Form } from "antd";
import { Link } from 'react-router-dom';


const Login = () => {

  const onSubmit = (data) => {
    console.log({
      email: data.email,
      password: data.password,
    });
    notification.success({
      message: "Sign up successfully!",
      description: "Please login to continue."
    })
    reset();
  }

  return (
    <div className="login-member">
      <h1 className="login-title">
        Login for member
      </h1>
      <div className="login-content">
        <Form onFinish={onSubmit} className="login-content__form">
          <div className="login-content__form__input__email">
            <Typography.Title level={5}>Username or E-Mail</Typography.Title>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
            >
              <Input size="large" placeholder="Username or E-Mail" />
            </Form.Item>
          </div>
          <div className="login-content__form__input__password">
            <Typography.Title level={5}>Password</Typography.Title>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  pattern: /^.{6,24}$/,
                  message: 'Password must be between 6 and 24 characters!',
                },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
          </div>
          <div className="login-content__form__button">
            <Button type="primary" htmlType="submit">Login</Button>
          </div>
          <div className="login-content-forget">
            <Link to={`/`}>Forget Password?</Link>
          </div>
        </Form>
        <div className="divider"></div>
        <div className="register-section">
          <h3 className="login-content-ask">
            Do not have an account?
          </h3>
          <p className="login-content-signup">
            <Link to={`/register/member`}>Create an account</Link>
          </p>
        </div>
        <div className="divider"></div>
        <div className="other-type-login">
          <h3 className="title">Or</h3>
          <div className="link-group">
            <Link className="link" to={"/login/admin"}>Login for admin</Link>
            <Link className="link" to={"/login/partner"}>Login for partner</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
