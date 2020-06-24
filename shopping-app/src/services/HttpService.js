import axios from "axios";

class HttpService {
  getProduct = () => {
    let promise = new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/product").then((response) => {
        resolve(response.data);
      });
    });

    return promise;
  };
}

export default HttpService;
