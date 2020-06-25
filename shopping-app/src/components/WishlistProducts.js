import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import NotificatonService, {
  NOTIF_WISHLIST_CHANGED,
} from "../services/NotificationService";

import DataService from "../services/DataServeice";

let ns = new NotificatonService();
let ds = new DataService();

const WishlistInfo = (props) => {
  const removeProduct = () => {
    ds.removeWishlistItem(props.product);
  };

  return (
    <ListGroup.Item>
      <a
        href="#"
        className="btn btn-outline-danger float-right"
        onClick={() => removeProduct()}
      >
        X
      </a>
      <p>
        {props.product.title} | <b>${props.product.price}</b>
      </p>
    </ListGroup.Item>
  );
};

class WishlistProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistItem: [],
    };
  }

  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
  }
  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  onWishlistChanged = (newWishlist) => {
    this.setState({ wishlistItem: newWishlist });
  };

  createWishlist = () => {
    const list = this.state.wishlistItem.map((item) => (
      <WishlistInfo key={item._id} product={item} />
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
