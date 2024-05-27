import "./Login.scss";
import { Col, Row, Input, Button, Typography } from "antd";
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <>
      <div className="login-title">
        Login
      </div>
      <div className="login-content">
        <div className="login-content__form">
          <Row>
            <Col xs={24} md={12}>

              <div className="login-content__form__input">
                <Typography.Title level={5}>Username or E-Mail</Typography.Title>
                <Input size="large" placeholder="Username" />
              </div>
            </Col>
            <Col xs={24} md={12}>

              <div className="login-content__form__input">
                <Typography.Title level={5}>Exceed Max</Typography.Title>
                <Input size="large" placeholder="Password" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={24}>
              <div className="login-content__form__button">
                <Button type="primary">Login</Button>
              </div>
              <div className="login-content-forget">
                <Link to={`/`}>Forget Password?</Link>
              </div>
              <div className="login-content-ask">
                DO NOT HAVE AN ACCOUNT?
              </div>
              <div className="login-content-signup">
                <Link to={`/`}>CREATE AN ACCOUNT</Link>
              </div>
            </Col>
          </Row>

        </div>
      </div>
    </>
  );
}

export default Login;
