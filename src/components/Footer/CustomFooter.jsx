import React from "react";
import { Layout, Row, Col, Divider } from "antd";

const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer style={{ backgroundColor: "#f0f2f5", padding: "20px 50px" }}>
      <Row justify="space-between">
        <Col span={8}>
          <div>
            <h3 style={{ fontWeight: 500 }}>My App</h3>
            <p>
              This is a sample footer component created with Ant Design. You can
              customize it further to suit your needs.
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ fontWeight: 500 }}>Contact Us</h4>
            <Divider style={{ margin: "10px 0" }} />
            <p>
              <strong>Email:</strong> example@example.com
            </p>
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 Main St, City, State, Zip
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ textAlign: "right" }}>
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Ant Design
            </a>{" "}
            ©2021 Created by Tabnine
          </div>
        </Col>
      </Row>
    </Footer>
  );
}

export default CustomFooter;