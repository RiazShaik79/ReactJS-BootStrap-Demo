import React, { Component } from "react";
import "./App.css";
import castle from "../src/Images/castle.jpg";

import { Link, withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classesLogOut = "nav-link disabled";
    let classesLogIn = "nav-link";
    console.log("userstate : " + localStorage.getItem("userLoggedInState"));
    if (localStorage.getItem("userLoggedInState")) {
      console.log("Im in home app");
      classesLogOut = "nav-link";
      classesLogIn = "nav-link disabled";
    }

    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-1">
            <img src="https://picsum.photos/80"></img>
          </div>
          <div className="col-md-9 topbarContent">
            <br />
            <h2> My Home Page </h2>
          </div>
          <div className="col-md-2 topbarContent">
            <br />
            <br />
            <h6>
              <span className="glyphicon glyphicon-user "></span>{" "}
              {this.props.username}
            </h6>
          </div>
        </div>
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
              <li class="nav-item active">
                <a class="nav-link" href="\">
                  <span className="glyphicon glyphicon-home"></span>
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="\about">
                  <span className="glyphicon glyphicon-info-sign"></span>
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="\products">
                  <span className="glyphicon glyphicon-briefcase"></span>
                  Products
                </a>
              </li>
              <li class="nav-item">
                <a class={classesLogOut} href="\orders">
                  Orders
                </a>
              </li>
              <li class="nav-item">
                <a class={classesLogOut} href="\mycart">
                  <span className="glyphicon glyphicon-shopping-cart"></span>
                  MyCart
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="\contactus">
                  <span className="glyphicon glyphicon-earphone "></span>
                  Contact Us
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item ">
                  <a
                    className={classesLogOut}
                    href="\"
                    onClick={this.props.handleLogout}
                  >
                    Logout
                  </a>
                </li>
                <li class="nav-item ">
                  <a className={classesLogIn} href="\sign-in">
                    Register/Sign-in
                  </a>
                </li>
              </ul>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                <span className="glyphicon glyphicon-search"></span> Search
              </button>
            </form>
          </div>
        </nav>
        <br />
        <div className="row">
          <div className="col-md-2 ">
            <div className="sidebarContent">Left Side Bar</div>
          </div>
          <div className="col-md-8 sidebarContent">
            <img src={require("../src/Images/castle.jpg")}></img>
          </div>
          <div className="col-md-2 ">
            <div className="sidebarContent">Right Side Bar</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
