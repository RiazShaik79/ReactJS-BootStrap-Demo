import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Counters from "./pages/counters";
import Counter from "./pages/counter";

class OrderDetails extends Component {
  state = {
    orders: [],
  };
  constructor(props) {
    super(props);
  }

  render() {
    let orders = this.props.orders
      .filter((c) => c.id > 100)
      .map((order) => {
        return (
          <div className="col-md-10">
            <div className="card textColorBlack">
              <div className="card-header ">
                <div className="row">
                  <div className="col-md-2">Order #: {order.id}</div>
                  <div className="col-md-2">
                    Order Status: {order.orderStatus}
                  </div>
                  <div className="col-md-2">Quantity</div>
                  <div className="col-md-4 ">
                    Total Price £: {order.totalAmount}{" "}
                    <button
                      className="btn btn-danger btn-sm  my-2 "
                      onClick={() => this.props.orderCancelStep(order)}
                    >
                      Cancel
                    </button>{" "}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ol>
                  {order.products.map((product) => (
                    <div className="row">
                      <div className="col-md-3">
                        <li>{product.name}</li>
                      </div>
                      <div className="col-md-3">
                        <ul>
                          <li>
                            {" x "}
                            {product.value}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        {" £ "}
                        {product.value * product.unitPrice}{" "}
                        <button
                          className="btn btn-secondary btn-sm  my-2"
                          onClick={() =>
                            this.props.returnProductStep(order, product)
                          }
                        >
                          Return
                        </button>{" "}
                        <button
                          className="btn btn-secondary btn-sm  my-2"
                          onClick={() =>
                            this.props.trackPackageStep(order, product)
                          }
                        >
                          Track Package
                        </button>{" "}
                      </div>
                    </div>
                  ))}
                </ol>
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
            <h3> This is Orders Page </h3>
          </div>
          <div className="col-md-2 topbarContent">
            <br />
            <span className="glyphicon glyphicon-shopping-cart "></span>
            <span className="badge badge-pill">
              {this.props.orders.filter((c) => c.value > 0).length}
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
              <li class="nav-item dropdown active">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Orders
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">
                    Cancel Order
                  </a>
                  <a class="dropdown-item" href="#">
                    Retrun Product
                  </a>
                </div>
              </li>
            </ul>
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
            <div className="row">{orders}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetails;
