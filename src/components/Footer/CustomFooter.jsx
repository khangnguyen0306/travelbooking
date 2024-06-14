import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";
import "./Footer.scss"
const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer className="footer">
      <Row className="content">
        <Col span={6}>
          <div>
            <Link to={"/"}>
              <h3 id="Logo-footer">Ta<span>bi</span></h3>
            </Link>
          </div>
        </Col>
        <Col span={6}>
          <div className="Footer-container-content">
            <h4 className="Footer-title-container">Contact</h4>
            <Divider style={{ margin: "10px 0" }} />
            <p className="Footer-content-container">
              <strong>T:</strong> <a href="mailto:example@example.com">example@example.com</a>

            </p>
            <p className="Footer-content-container">
              <strong>E:</strong> 123 Main St, City, State, Zip
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div className="Footer-container-content">
            <h4 className="Footer-title-container">Useful Links</h4>
            <Divider style={{ margin: "10px 0" }} />
            <Link>
              <p className="Footer-content-container">
                Travel Blog & Tips
              </p>
            </Link>
            <Link>
              <p className="Footer-content-container">
                Working With Us
              </p>
            </Link>
            <Link>
              <p className="Footer-content-container">
                Be Our Partner
              </p>
            </Link>
          </div>
        </Col>
        <Col span={6}>
          <div className="Footer-container-content">
            <h4 className="Footer-title-container">Pay Safely With Us</h4>
            <Divider style={{ margin: "10px 0" }} />
            <p className="Footer-content-container">
              The payment is encrypted and transmitted securely with an SSL protocol.
            </p>
          </div>
        </Col>
      </Row>
    </Footer>
  );
}

export default CustomFooter;