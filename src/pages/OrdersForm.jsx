import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Success from "./Success";
import Confirm from "./Confirm";
import OrderDetails from "../OrdersDetails";
import axios from "axios";
import Checkout from "../checkout";
import OrderSuccess from "./OrderSuccess";
import CancelOrder from "./CancelOrder";
import ReturnProduct from "./RetrunProduct";
import TrackPackage from "./TrackPackage";

export class OrdersForm extends Component {
  state = {
    orders: [],
    step: 1,
    order: "",
    product: "",
  };

  constructor(props) {
    super(props);
    this._refreshOrders = this._refreshOrders.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this._refreshOrders();
  }

  _refreshOrders() {
    console.log("Token Received: " + this.props.token);

    console.log("am inside refreshorders ");
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios.get("http://localhost:8080/orders", config).then((response) => {
      console.log("orders " + JSON.stringify(response.data));
      this.setState({
        orders: response.data,
      });
    });
  }

  handleSave() {
    const orders = [...this.state.orders];

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .put("http://localhost:8080/orders", this.state.orders, config)
      .then((response) => {
        console.log(response.data);
      });
  }

  orderCancelStep = (order) => {
    this.setState({ order: { ...order } });

    const { step } = this.state;
    this.setState({
      step: 2,
    });
  };

  returnProductStep = (order, product) => {
    this.setState({ order: { ...order } });
    this.setState({ product: { ...product } });

    const { step } = this.state;
    this.setState({
      step: 3,
    });
  };

  //go back to previous step
  trackPackageStep = (order, product) => {
    this.setState({ order: { ...order } });
    this.setState({ product: { ...product } });

    const { step } = this.state;
    this.setState({
      step: 4,
    });
  };

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <OrderDetails
            username={localStorage.getItem("userName")}
            token={localStorage.getItem("userToken")}
            orderCancelStep={this.orderCancelStep}
            returnProductStep={this.returnProductStep}
            trackPackageStep={this.trackPackageStep}
            orders={this.state.orders}
            handleSave={this.handleSave}
          />
        );
      case 2:
        return (
          <CancelOrder
            username={localStorage.getItem("userName")}
            token={localStorage.getItem("userToken")}
            order={this.state.order}
          />
        );
      case 3:
        return (
          <ReturnProduct
            username={localStorage.getItem("userName")}
            token={localStorage.getItem("userToken")}
            order={this.state.order}
            product={this.state.product}
          />
        );
      case 4:
        return (
          <TrackPackage
            username={localStorage.getItem("userName")}
            token={localStorage.getItem("userToken")}
            order={this.state.order}
            product={this.state.product}
          />
        );
    }
  }
}

export default OrdersForm;
