import Card from "react-bootstrap/Card";

const ProductCard = (props) => {
  return (
    <a href={props.link}>
    <Card className="mb-3 mt-3">
      <Card.Img
        variant="top"
        className="product-img"
        src={`${process.env.PUBLIC_URL}/assets/images/${props.img}`}
        alt="React is moering you"
      />
      <Card.Body className="text-left">
      <span className="text-dark font-weight-normal"> {props.title} </span>
          <p className="text-dark font-weight-light">Phantom</p>
       <span className="text-dark font-weight-bold">{props.price}</span>
      </Card.Body>
    </Card>
    </a>
  );
};

export default ProductCard;
