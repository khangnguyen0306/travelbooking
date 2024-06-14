import "./HotelItem.scss"
import { Card } from 'antd';
import { Rate } from 'antd';
import { CrownOutlined } from "@ant-design/icons";
const { Meta } = Card;

function HotelItem() {
    return (
        <Card
            className='room-item'
            // hoverable
            style={{
                minWidth: 280,
            }}
            cover={
                <img alt="example" src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/collov-home-design-LSpkE5OCD_8-unsplash-700x500.jpg" />
            }
        >
            <div>
                <a className="room-name">The Hotel</a>
                <div className="feedback">
                    <Rate className="rate" allowHalf value={5} disabled />
                    <span className="review">(1 review)</span>
                </div>
                <div className="type">
                    <CrownOutlined className="icon" />
                    <span className="type-name">King Beds</span>
                </div>
                <p className="price">From <span className="old">$250</span> $199</p>
            </div>
            <span className="discount">20% OFF</span>
        </Card>
    );
}

export default HotelItem;