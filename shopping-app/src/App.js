import React from "react";
import httpService from "./services/HttpService";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import ProductCart from "./components/ProductCart";

const http = new httpService();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.loadData();
  }

  loadData = () => {
    var self = this;
    http
      .getProduct()
      .then((data) => {
        self.setState({ products: data });
      })
      .catch((err) => {
        console.log("err");
      });
  };

  // Map Array Loop
  productList = () => {
    const list = this.state.products.map((product) => (
      <div className="col-md-4" key={product._id}>
        <ProductCart
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      </div>
    ));
    return list;
  };

  render() {
    return (
      <Container className="mt-5">
        <h3 className="text-center text-uppercase mb-3">Products Cart</h3>
        <Row>{this.productList()}</Row>
      </Container>
    );
  }
}

export default App;
