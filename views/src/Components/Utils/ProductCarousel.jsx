import Carousel from "react-bootstrap/Carousel";

const ProductCarousel = (props) =>{
    return(<Carousel variant="dark">
    {props.images &&
      props.images.map((item, index) => (
        <Carousel.Item key={index} className="prodDisplay">
          <img
            className="d-block w-100 prodDisplay"
            src={`${process.env.PUBLIC_URL}/assets/images/${item.img}`}
            alt="Cannot find product"
          />
          <span
            aria-hidden="true"
            className="carousel-control-next-icon"
          />
          <span
            aria-hidden="true"
            className="carousel-control-prev-icon"
          />
        </Carousel.Item>
      ))}
  </Carousel>);
}


export default ProductCarousel;