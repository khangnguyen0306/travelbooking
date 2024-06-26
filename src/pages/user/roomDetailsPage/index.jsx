import { useEffect } from "react";
import "./RoomDetailsPage.scss";
import { Rate, Avatar, FloatButton } from "antd";
import { UserOutlined } from '@ant-design/icons';
import BookingForm from "./Components/BookingForm";
import { useParams } from "react-router-dom";

function RoomDetailsPage() {
    const params = useParams();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <div className="wrapper-room-detail-page">
            <div className="container">
                <div className="heading">
                    <h1 className="name">The Penthouse</h1>
                    <div className="feedback">
                        <Rate className="rate" value={5} />
                        <span className="review">(1 review)</span>
                    </div>
                </div>
                <div className="overview">
                    <span className="item">2 King Beds</span>
                    <span className="item">Max: 6 Guests</span>
                    <span className="item">62 sqm</span>
                    <span className="item">City View</span>
                </div>
                <div className="img">
                    <img
                        className="main-img"
                        src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/collov-home-design-LSpkE5OCD_8-unsplash-900x500.jpg"
                        alt=""
                    />
                    <div className="sub-img" >
                        <img
                            className="item"
                            src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/chastity-cortijo-604624-unsplash.jpg"
                            alt=""
                        />
                        <img
                            className="item"
                            src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/chastity-cortijo-604624-unsplash.jpg"
                            alt=""
                        />
                        <img
                            className="item"
                            src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/chastity-cortijo-604624-unsplash.jpg"
                            alt=""
                        />
                        <img
                            className="item"
                            src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/chastity-cortijo-604624-unsplash.jpg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="info">
                    <div className="details">
                        <div className="price">
                            <h3 className="from">From $200.00</h3>
                            <span className="per">per night</span>
                        </div>
                        <div className="description">
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
                            <br />
                            <br />
                            The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown
                        </div>
                        <div className="amenities">
                            <div className="section">
                                <h3 className="title">Room Amenities</h3>
                                <div className="list">
                                    <span className="item">Air Conditioning</span>
                                    <span className="item">Air Conditioning</span>
                                    <span className="item">Air Conditioning</span>
                                    <span className="item">Air Conditioning</span>
                                    <span className="item">Air Conditioning</span>
                                    <span className="item">Air Conditioning</span>
                                    <span className="item">Air Conditioning</span>
                                    <span className="item">Air Conditioning</span>
                                </div>
                            </div>
                            <div className="section">
                                <h3 className="title">Hotel Amenities</h3>
                                <div className="list">
                                    <span className="item">24 Hour Concierge</span>
                                    <span className="item">24 Hour Concierge</span>
                                    <span className="item">24 Hour Concierge</span>
                                    <span className="item">24 Hour Concierge</span>
                                    <span className="item">24 Hour Concierge</span>
                                    <span className="item">24 Hour Concierge</span>
                                    <span className="item">24 Hour Concierge</span>
                                    <span className="item">24 Hour Concierge</span>
                                </div>
                            </div>
                        </div>
                        <div className="rules">
                            <h3 className="title">Hotel Rules</h3>
                            <ul className="list">
                                <li className="item">Smoking not allowed</li>
                                <li className="item">Pets not allowed</li>
                                <li className="item">Swimming pool closed from 8.00pm - 6.00am</li>
                            </ul>
                        </div>
                    </div>
                    <div className="booking">
                        <BookingForm />
                    </div>
                </div>
                <div className="more-rooms">
                    <h3 className="title">More Rooms</h3>
                    <div className="list-rooms">
                        <div className="item">
                            <div className="meta">
                                <span className="sale-off">20% OFF</span>
                                <a className="img" href="">
                                    <img className="thumb" src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/ialicante-mediterranean-homes-475803-unsplash-700x500.jpg" alt="" />
                                </a>
                                <span className="price">From <span className="old">$200</span> $160</span>
                            </div>
                            <a className="name" href="">
                                Grand Suite Room
                            </a>
                            <div className="sub-overview">
                                <span className="item">Double Beds</span>
                                <span className="item">4</span>
                            </div>
                            <a className="booking" href="">
                                BOOK NOW
                            </a>
                        </div>
                        <div className="item">
                            <div className="meta">
                                <span className="sale-off">20% OFF</span>
                                <a className="img" href="">
                                    <img className="thumb" src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/ialicante-mediterranean-homes-475803-unsplash-700x500.jpg" alt="" />
                                </a>
                                <span className="price">From <span className="old">$200</span> $160</span>
                            </div>
                            <a className="name" href="">
                                Grand Suite Room
                            </a>
                            <div className="sub-overview">
                                <span className="item">Double Beds</span>
                                <span className="item">4</span>
                            </div>
                            <a className="booking" href="">
                                BOOK NOW
                            </a>
                        </div>
                        <div className="item">
                            <div className="meta">
                                <span className="sale-off">20% OFF</span>
                                <a className="img" href="">
                                    <img className="thumb" src="https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/08/ialicante-mediterranean-homes-475803-unsplash-700x500.jpg" alt="" />
                                </a>
                                <span className="price">From <span className="old">$200</span> $160</span>
                            </div>
                            <a className="name" href="">
                                Grand Suite Room
                            </a>
                            <div className="sub-overview">
                                <span className="item">Double Beds</span>
                                <span className="item">4</span>
                            </div>
                            <a className="booking" href="">
                                BOOK NOW
                            </a>
                        </div>
                    </div>
                </div>
                <div className="feedback">
                    <div className="total">
                        <div className="review">
                            <span className="count">2 Reviews</span>
                            <Rate className="rate" value={5} disabled />
                        </div>
                        <div className="sort">
                            <span className="title">Sort By:</span>
                            <button className="btn">Rating</button>
                            <button className="btn">Date</button>
                        </div>
                    </div>
                    <div className="list">
                        <div className="item">
                            <div className="user">
                                <Avatar className="avatar" size={90} icon={<UserOutlined />} />
                                <span className="name">Jane Smith</span>
                            </div>
                            <div className="review">
                                <p className="content">Nice room!</p>
                                <Rate className="rate" value={5} disabled />
                                <p className="date">August 9, 2022</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="user">
                                <Avatar className="avatar" size={90} icon={<UserOutlined />} />
                                <span className="name">Jane Smith</span>
                            </div>
                            <div className="review">
                                <p className="content">Nice room!</p>
                                <Rate className="rate" value={5} disabled />
                                <p className="date">August 9, 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FloatButton.BackTop visibilityHeight={1000} />
        </div >
    );
}

export default RoomDetailsPage;