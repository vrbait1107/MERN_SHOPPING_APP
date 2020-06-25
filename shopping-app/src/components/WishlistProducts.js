import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const WishlistInfo = (props) => {
  return (
    <ListGroup.Item>
      <a href="#" className="btn btn-outline-danger float-right">
        X
      </a>
      <p>
        {props.title} | <b>${props.price}</b>
      </p>
    </ListGroup.Item>
  );
};

class WishlistProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistItem: [
        {
          _id: "6bvv63546dhdh",
          title: "Car Toys",
          price: 24.99,
        },
        {
          _id: "6bvv6354ff6dhdh",
          title: "Robot Toys",
          price: 24.99,
        },
        {
          _id: "6bvv6ddf3546dhdh",
          title: "Tedy Bear",
          price: 24.99,
        },
      ],
    };
  }

  createWishlist = () => {
    const list = this.state.wishlistItem.map((item) => (
      <WishlistInfo key={item._id} title={item.title} price={item.price} />
    ));
    return list;
  };

  render() {
    return (
      <Card>
        <Card.Header className="text-center text-uppercase">
          <h4 className="font-time">Your Wishlist</h4>
        </Card.Header>
        <ListGroup>{this.createWishlist()}</ListGroup>
      </Card>
    );
  }
}

export default WishlistProducts;
