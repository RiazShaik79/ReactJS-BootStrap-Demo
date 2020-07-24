import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Counters from "./pages/counters";
import Counter from "./pages/counter";

class MyCartDetails extends Component {
  state = {
    products: [],
    userState: false,
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("user state2 " + this.props.userLoggedIn);
  }

  render() {
    let products = this.props.mycart.products
      .filter((c) => c.value > 0)
      .map((product) => {
        return (
          <div className="col-md-2 marginBottom">
            <div className="card textColorBlack">
              <div className="card-header "> {product.name}</div>
              <div className="card-body ">
                <a href="#" className="thumbnail">
                  <img src="https://picsum.photos/100"></img>
                </a>
                <b> £ {product.unitPrice}</b>
                <Counter
                  key={product.id}
                  onIncrement={this.props.handleIncrement}
                  onDecrement={this.props.handleDecrement}
                  counter={product}
                  userLoggedIn={this.props.userLoggedIn}
                />
              </div>
            </div>
          </div>
        );
      });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1">
            <img src="https://picsum.photos/80"></img>
          </div>
          <div className="col-md-9 topbarContent">
            <br />
            <h3> This is My Cart Page </h3>
          </div>
          <div className="col-md-2 topbarContent">
            <br />
            <span className="glyphicon glyphicon-shopping-cart "></span>
            <span className="badge badge-pill">
              {this.props.mycart.products.filter((c) => c.value > 0).length}
            </span>{" "}
            <br />
            <h6>
              <span className="glyphicon glyphicon-user "></span>{" "}
              {this.props.username}
            </h6>
          </div>
        </div>{" "}
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ">
                <a class="nav-link" href="/">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="\products">
                  <span className="glyphicon "></span>
                  Products
                </a>
              </li>
            </ul>
            <div>
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                onClick={this.props.nextStep}
                disabled={!this.props.userLoggedIn}
              >
                Checkout
              </button>{" "}
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                onClick={this.props.handleReset}
                disabled={!this.props.userLoggedIn}
              >
                Reset Cart
              </button>{" "}
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                onClick={this.props.handleSavetoCart}
                disabled={!this.props.userLoggedIn}
              >
                Save Cart
              </button>
            </div>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2 m-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />{" "}
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <br />
        <div className="row">
          <div className="col-md-2 ">
            <div className="sidebarContent">Left Side Bar</div>
          </div>
          <div className="col-md-10 ">
            <div className="row">{products}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyCartDetails;
