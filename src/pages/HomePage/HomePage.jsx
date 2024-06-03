import "./HomePage.scss"
import Filter from "./Components/Filter/Filter";
import HotelsSection from "./Components/HotelsSection";
import Rental from "./Components/Rental/Rental";
import Feedback from "./Components/Customer-feedback/Feedback";

function HomePage() {
  return (
    <div className="home-page">
      <Filter />
      <HotelsSection />
      <Rental />
      <Feedback />
    </div>
  );
}

export default HomePage;
