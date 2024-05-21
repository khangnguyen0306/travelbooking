import { Badge, Button, Card, Col, Form, Input, Row, Select } from "antd";
import {
  useGetFlowersQuery,
  useAddFlowerMutation,
} from "../../services/flowerApi";
import "./Dashboard.scss"
import IMG from '../../assets/photo-3-1485152074061.jpg';
import IMG2 from '../../assets/gym3.png';
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Rental from "../../components/HomePage/Rental/Rental";
import GetContact from "../../components/HomePage/Getcontact/GetContact";
import HotelsSection from "../../components/HomePage/HotelsSection";
import Feedback from "../../components/HomePage/Customer-feedback/Feedback";
import { VietnameseProvinces } from "../../utils/utils";

function Dashboard() {

  const { data, isLoading } = useGetFlowersQuery();
  const [keywords, setKeywords] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [mutate] = useAddFlowerMutation();
  console.log(data);
  const onChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = async (data) => {
    console.log("data: " + data);
    try {
      const newData = {
        ...data,
      };
      console.log(newData);
      await mutate(newData).unwrap();
    } catch (err) {
      console.log(err.message);
    }
  };
  if (isLoading) {
    return <div> flower is loading</div>;
  }
  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",

      }}
    >
      <Row justify="center" align="middle" className="Home-layout">
        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }} className="Card-container-home">
            <div className="Bagde-card-container-home">
              <p>Book With Us!</p>
            </div>
            <h1 className="title-card-container-home">Find Next Place
              To <span style={{ color: '#5c98f2' }}>Visit</span></h1>
            <div className="content-card-container-home">
              <p >Discover amzaing places at exclusive deals.</p>
              <p>
                Eat, Shop, Visit interesting places around the world.</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={11}>
          <img src={IMG} style={{ width: '505px', height: '680px', marginTop: '6rem', borderRadius: '30px' }} />
        </Col>

        <div className="search-layout-home">
          <div className="search-content-container">
            <label className="search-content-container-label" style={{ fontFamily: 'DM Sans, sans-serif' }}>Key words</label>
            <Input
              placeholder="Type your keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              style={{ marginRight: '10px', border: 'none', color: '#8c8c8c', fontSize: '16px' }}
            />
          </div>
          {/* /////////////////////////////// */}
          <div className="search-content-container">
            <label className="search-content-container-label">Destination</label>
            <Select
              onChange={(value) => setDestination(value)}
              showSearch
              style={{
                width: 200,
                border: 'none',
                color: '#8c8c8c',
                fontSize: '16px'
              }}
              placeholder="Select a province"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.children ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
              filterSort={(optionA, optionB) => optionA.children.localeCompare(optionB.children)}
            >
              {VietnameseProvinces.map((province, index) => (
                <Option key={index} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </div>
          <div className="search-content-container">
            <label className="search-content-container-label">Duration</label>
            <Select
              placeholder="Duration"
              value={duration}
              onChange={(value) => setDuration(value)}
              style={{ width: '120px', marginRight: '10px' }}
            >
              {[1, 2, 3].map((day) => (
                <Option key={day}>{`${day} day${day > 1 ? 's' : ''}`}</Option>
              ))}
            </Select>
          </div>
          <div className="search-layout-home-btn">
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <p><SearchOutlined /></p>
              <p>Search now</p>
            </div>
          </div>
        </div>
      </Row>
      <br></br>
      <br></br>

      <br></br>
      <img src={IMG2} />
      <HotelsSection />
      <Rental />
      <Feedback />
      <GetContact />

    </div>
  );
}

export default Dashboard;
