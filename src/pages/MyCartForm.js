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

export class MyCartForm extends Component {
  state = {
    mycart: {
      username: "",
      topics: [],
    },
    step: 1,
  };

  constructor(props) {
    super(props);
    this._refreshCart = this._refreshCart.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSavetoCart = this.handleSavetoCart.bind(this);
    this.state.mycart.username = localStorage.getItem("userName");
  }

  componentWillMount() {
    this._refreshCart();
  }

  _refreshCart() {
    console.log("Token Received: " + this.props.token);

    console.log("am inside refresh Cart ");
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
        console.log(this.state.mycart.topics);
      });
  }

  handleReset = () => {
    const topics = this.state.mycart.topics.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({
      mycart: { username: localStorage.getItem("userName"), topics },
    });
    this.handleSavetoCart();
  };

  handleIncrement = (product) => {
    const topics = [...this.state.mycart.topics];

    const index = topics.indexOf(product);
    topics[index] = { ...product };
    topics[index].value++;
    this.setState({
      mycart: { username: localStorage.getItem("userName"), topics },
    });
  };

  handleDecrement = (product) => {
    const topics = [...this.state.mycart.topics];
    const index = topics.indexOf(product);
    topics[index] = { ...product };
    topics[index].value--;
    if (topics[index].value <= 0) {
      topics[index].value = 0;
    }
    this.setState({
      mycart: { username: localStorage.getItem("userName"), topics },
    });
  };

  //proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  //go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleSavetoCart() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .put("http://localhost:8080/mycart", this.state.mycart, config)
      .then((response) => {
        console.log(response.data);
      });
  }

  render() {
    const { step } = this.state;
    const { onReset, counters, onDelete, onIncrement } = this.props;
    switch (step) {
      case 1:
        return (
          <MyCartDetails
            username={localStorage.getItem("userName")}
            token={localStorage.getItem("userToken")}
            nextStep={this.nextStep}
            mycart={this.state.mycart}
            handleIncrement={this.handleIncrement}
            handleDecrement={this.handleDecrement}
            handleReset={this.handleReset}
            handleSavetoCart={this.handleSavetoCart}
            userLoggedIn={this.props.userLoggedIn}
          />
        );
      case 2:
        return (
          <Checkout
            username={localStorage.getItem("userName")}
            token={localStorage.getItem("userToken")}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            products={this.state.mycart.topics}
            handleIncrement={this.handleIncrement}
            handleDecrement={this.handleDecrement}
            handleReset={this.handleReset}
            handleSave={this.handleSave}
          />
        );
      case 3:
        return <OrderSuccess handleReset={this.handleReset} />;
    }
  }
}

export default MyCartForm;
