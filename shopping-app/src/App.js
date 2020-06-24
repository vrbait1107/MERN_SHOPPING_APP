import React from "react";
import httpService from "./services/HttpService";

import axios from "axios";

const http = new httpService();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loadData();
  }

  loadData = () => {
    http
      .getProduct()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  render() {
    return <p>This is my first mern app</p>;
  }
}

export default App;
