import "./Login.scss";
import { Col, Row, Input, Button, Typography, notification, Form } from "antd";
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
    <div className="login">
      <div className="login-title">
        Login
      </div>
      <div className="login-content">
        <Form onFinish={onSubmit} className="login-content__form">
          <Row>
            <Col xs={24} md={12}>

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
            </Col>
            <Col xs={24} md={12}>

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
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={24}>
              <div className="login-content__form__button">
                <Button type="primary" htmlType="submit">Login</Button>
              </div>
              <div className="login-content-forget">
                <Link to={`/`}>Forget Password?</Link>
              </div>
              <div className="login-content-ask">
                DO NOT HAVE AN ACCOUNT?
              </div>
              <div className="login-content-signup">
                <Link to={`/register`}>CREATE AN ACCOUNT</Link>
              </div>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  );
}

export default Login;
