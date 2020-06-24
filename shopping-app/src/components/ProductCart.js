import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCart = (props) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={props.imageUrl}
        style={{ height: 200 }}
        className="img-fluid"
      />
      <Card.Body>
        <Card.Title className="text-center text-primary">
          <h3>{props.title}</h3>
        </Card.Title>
        <Card.Text>
          <h5 className="text-center">Price: ${props.price}</h5>
          <Button variant="primary" block>
            Add to Wishlist
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCart;
