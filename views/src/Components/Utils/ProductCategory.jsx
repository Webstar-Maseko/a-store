import Card from "react-bootstrap/Card";


function ProductCategory(props) {
    return (<>
        <a href={props.link}>
        <Card>
            <Card.Img className="product-cat" src={props.img} variant="top" />
            
            <div className="text-center pt-4 pb-4">
                <a href={props.link} className="btn btn-outline-secondary pl-4 pr-4">SHOP NOW</a>
            </div>
        </Card>
        </a>
    </>)
}

export default ProductCategory;