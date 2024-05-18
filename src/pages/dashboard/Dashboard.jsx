import { Badge, Button, Card, Col, Form, Input, Row, Select } from "antd";
import {
  useGetFlowersQuery,
  useAddFlowerMutation,
} from "../../services/flowerApi";
import FormItem from "antd/es/form/FormItem";
import Meta from "antd/es/card/Meta";
import { ImportFile } from "../../assets/importSVG";
import "./Dashboard.scss"
import IMG from '../../assets/img-home.jpg';
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Rental from "../../components/HomePage/Rental/Rental";
import RoomsSection from "../../components/RoomsSection";
import Feedback from "../../components/HomePage/Customer-feedback/Feedback";
function Dashboard() {
  const VietnameseProvinces = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Phú Yên",
    "Cần Thơ",
    "Đà Nẵng",
    "Hải Phòng",
    "Hà Nội",
    "TP Hồ Chí Minh"
  ];
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

      <RoomsSection />
      <Rental />
      <Feedback />
      {/* <h1>Create Flower: </h1>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ flex: 1 }}
        layout="horizontal"
        style={{
          marginTop: 20,
          maxHeight: "400px",
          overflowY: "auto",
          padding: "4px 0",
        }}
        onFinish={onSubmit}
      >
        <FormItem
          key={"nam_1"}
          // control={control}
          name={"name"}
          label={
            <span
              style={{
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            >
              name
            </span>
          }
        >
          <Input onChange={onChange} placeholder={`Type name here . . .`} />
        </FormItem>
        <button type="submit">Create</button>
      </Form>

      <br />
      <h1>List of Flower: </h1>
      {data && data.map((el) => <div key={el.id}>{el.name}</div>)}
      <div style={{ height: '400px' }}></div>*/}
    </div>
  );
}

export default Dashboard;
