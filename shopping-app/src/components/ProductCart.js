import React from "react";
import { Card, Button } from "react-bootstrap";
import DataService from "../services/DataServeice";
import NotificationService, {
  NOTIF_WISHLIST_CHANGED,
} from "../services/NotificationService";

let ds = new DataService();
let ns = new NotificationService();

class ProductCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { onWishlist: ds.itemOnWishlist() };
  }

  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
  }
  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  onWishlistChanged = () => {
    this.setState({ onWishlist: ds.itemOnWishlist(this.props.product) });
  };

  onButtonClicked = () => {
    if (this.state.onWishlist) {
      ds.removeWishlistItem(this.props.product);
    } else {
      ds.addWishlistItem(this.props.product);
    }
  };

  render() {
    var btnClass;
    if (this.state.onWishlist) {
      btnClass = "danger";
    } else {
      btnClass = "primary";
    }

    return (
      <Card>
        <Card.Img
          variant="top"
          src={this.props.product.imageUrl}
          style={{ height: 200 }}
          className="img-fluid"
        />
        <Card.Body>
          <Card.Title className="text-center text-primary">
            <h3 className="font-time">{this.props.product.title}</h3>
          </Card.Title>

          <h5 className="text-center">Price: ${this.props.product.price}</h5>

          <Button
            variant={btnClass}
            onClick={() => this.onButtonClicked()}
            block
          >
            {this.state.onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCart;
