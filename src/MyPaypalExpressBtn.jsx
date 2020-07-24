import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

export default class MyPaypalExpressBtn extends React.Component {
  state = {
    order: {
      products: [],
      totalAmount: 0,
      paymentId: "",
    },
  };
  constructor(props) {
    super(props);
    this.createOrder = this.createOrder.bind(this);
    //this.state.order.products = this.props.products;
    //this.state.order.totalAmount = this.props.totalAmount;
  }

  createOrder(payment) {
    this.setState({
      order: {
        products: this.props.products,
        totalAmount: this.props.totalAmount,
        paymentId: payment.paymentID,
      },
    });

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .post("http://localhost:8080/orders", this.state.order, config)
      .then((response) => {
        console.log(response.data);
        this.props.nextStep();
      });
  }

  render() {
    const onSuccess1 = (details, data) => {
      console.log("details " + JSON.stringify(details));
      console.log("data " + JSON.stringify(data));
      alert("Transaction completed by " + details.payer.name.given_name);

      // OPTIONAL: Call your server to save the transaction
      return fetch("/paypal-transaction-complete", {
        method: "post",
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });
    };
    const onSuccess = (payment) => {
      console.log("Your payment was succeeded!", payment);

      this.createOrder(payment);
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log("You have cancelled the payment!", data);
    };
    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      // Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    const client = {
      sandbox:
        "AYr1fDDAbEEqgXxfusgIW6Q-mMheX9pJtnPx5x8cGxkjIxy2zoDsSJr76r3twxRLS_AyXR1cq4JMeu2O",
    };

    return (
      <div>
        <PaypalExpressBtn
          client={client}
          currency={"GBP"}
          total={this.props.totalAmount}
          intent={"sale"}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </div>
    );
  }
}
