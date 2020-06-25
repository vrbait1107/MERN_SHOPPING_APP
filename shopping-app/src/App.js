import React from "react";

// # HTTP Services
import httpService from "./services/HttpService";

// # React-Bootstrp Component
import { Container, Row, Col } from "react-bootstrap";

// # Components
import ProductCart from "./components/ProductCart";
import WishlistProducts from "./components/WishlistProducts";

import "./App.css";

const http = new httpService();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
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
        <ProductCart product={product} />
      </div>
    ));
    return list;
  };

  render() {
    return (
      <Container className="mt-5" fluid>
        <h2 className="text-center text-uppercase font-weight-bold mb-5">
          Shopping App
        </h2>
        <Row>
          <Col md={8}>
            <Row>{this.productList()}</Row>
          </Col>
          <Col md={4}>
            <WishlistProducts />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
