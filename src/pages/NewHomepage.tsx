// import CarouselHomepage from "../Components/CarouselHomepage";

// function NewHomepage() {
//   return <CarouselHomepage />;
// }
// import "./Styles/NewHomepage.css"
import "../Styles/NewHomepage.css"
import testImage from "../assets/testimage_kids_watching_tv.jpg"
import SimpleSlider from "../Components/Carousel";

function NewHomepage() {
    return (
    <div className="page-container">
      <header>New Homepage</header>
      <hr />
      <div className="content-container">
        <div className="tv-wrapper">
          <img src={testImage} alt="TV" className="tv-image" />
          <div className="carousel-overlay">
            <SimpleSlider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewHomepage;
