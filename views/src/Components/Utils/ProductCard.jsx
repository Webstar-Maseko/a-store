import Card from "react-bootstrap/Card";

const ProductCard = (props) => {
  return (
    <Card className="mb-3 mt-3">
      <Card.Img
        variant="top"
        className="product-img"
        src={`${process.env.PUBLIC_URL}/assets/images/${props.img}`}
        alt="React is moering you"
      />
      <Card.Body className="text-left">
        <Card.Title className="text-dark font-weight-normal">
          {props.title}
        </Card.Title>
        <Card.Title className="text-dark font-weight-light">
          {" "}
          testing{" "}
        </Card.Title>
        <Card.Title className="text-dark">{props.price}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
