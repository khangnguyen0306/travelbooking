import "./HomePage.scss"
import Filter from "./Components/Filter/Filter";
import HotelsSection from "./Components/HotelsSection";
import Rental from "./Components/Rental/Rental";
import GetContact from "./Components/GetContact/GetContact";
import Feedback from "./Components/Customer-feedback/Feedback";

function HomePage() {
  return (
    <div className="home-page">
      <Filter />
      <HotelsSection />
      <Rental />
      <Feedback />
      <GetContact />
    </div>
  );
}

export default HomePage;
