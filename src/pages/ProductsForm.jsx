import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Success from "./Success";
import Confirm from "./Confirm";
import ProductsDetails from "../ProductsDetails";
import axios from "axios";
import Checkout from "../checkout";
import OrderSuccess from "./OrderSuccess";
import MyCartDetails from "../MyCartDetails";
import { ActionExitToApp } from "material-ui/svg-icons";

export class ProductsForm extends Component {
  state = {
    products: [],
    mycart: {
      username: "",
      products: [],
    },
    step: 1,
    pageNo: 0,
  };

  constructor(props) {
    super(props);
    this._refreshProducts = this._refreshProducts.bind(this);
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
    this.handleSavetoCart = this.handleSavetoCart.bind(this);
    this._refreshCart = this._refreshCart.bind(this);

    this.state.mycart.username = localStorage.getItem("userName");
  }

  componentWillMount() {
    this._refreshProducts();
    this._refreshCart();
  }

  _refreshProducts() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .get("http://localhost:8080/products/" + this.state.pageNo + "/6/id")
      .then((response) => {
        this.setState({
          products: response.data,
        });
        console.log("products " + response.data);
      });
  }

  _refreshCart() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .post("http://localhost:8080/mycart/get", this.state.mycart, config)
      .then((response) => {
        this.setState({ mycart: response.data });
        console.log("mycart " + response.data);
      });
  }

  previousPage = () => {
    const { pageNo } = this.state;
    if (pageNo > 0) {
      this.setState({
        pageNo: pageNo - 1,
      });
    }
    console.log("am inside refreshproducts ");
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .get(
        "http://localhost:8080/products/" + (this.state.pageNo - 1) + "/6/id"
      )
      .then((response) => {
        this.setState({
          products: response.data,
        });
      });

    //this._refreshProducts();
  };

  nextPage = () => {
    const { pageNo } = this.state;

    this.setState({
      pageNo: pageNo + 1,
    });

    console.log("am inside refreshproducts ");
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .get(
        "http://localhost:8080/products/" + (this.state.pageNo + 1) + "/6/id"
      )
      .then((response) => {
        this.setState({
          products: response.data,
        });
        console.log("products " + response.data);
      });

    //this._refreshProducts();
  };

  handleAddtoCart(product) {
    const products = [...this.state.mycart.products];
    console.log("topics length " + products.length);

    let productExist = false;
    let i = 0;
    for (i = 0; i < products.length; i++) {
      if (products[i].name == product.name) {
        productExist = true;
        products[i].value++;
      }
    }

    if (!productExist) {
      product.value = 1;
      products.push(product);
    }

    this.setState({
      mycart: { username: localStorage.getItem("userName"), products },
    });

    /* let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

      axios
      .put(
        //"http://localhost:8080/mycart" + localStorage.getItem("userName"),
        "http://localhost:8080/mycart/rshaikb",
        this.state.mycart,
        config
      )
      .then((response) => {
        console.log(response.data);
      }); */
  }

  handleSavetoCart() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .put("http://localhost:8080/mycart/", this.state.mycart, config)
      .then((response) => {
        console.log(response.data);
      });
  }

  render() {
    return (
      <ProductsDetails
        username={localStorage.getItem("userName")}
        token={localStorage.getItem("userToken")}
        previousPage={this.previousPage}
        nextPage={this.nextPage}
        handleChange={this.handleChange}
        products={this.state.products}
        mycart={this.state.mycart}
        handleSavetoCart={this.handleSavetoCart}
        handleAddtoCart={this.handleAddtoCart}
        userLoggedIn={this.props.userLoggedIn}
      />
    );
  }
}

export default ProductsForm;
