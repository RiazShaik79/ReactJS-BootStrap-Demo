import React, { useState, Component } from "react";
import "./App.css";
import axios from "axios";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

class Contactus extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    message: "",
    dropdownOpen: false,
    title: "Title",
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Im from Contatus post");
    console.log(this.state);
    axios
      .post("http://localhost:8080/contacts", this.state)
      .then((response) => {
        console.log("Response : " + response.data);
      })
      .catch((err) => console.error(err));

    this.props.history.push("/");
  };

  handleSelect = (e) => {
    console.log(e);
    console.log("hello");
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      title: event.target.innerText,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 topbarContent">
            <h1>This is Contact Us Page</h1>
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
              <li class="nav-item ">
                <a class="nav-link" href="/">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="\about">
                  Contact Us
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
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
          <div className="col-md-8 ">
            <form className="form-vertical ">
              <div className="form-group ">
                <br />
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    {this.state.title} <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      {" "}
                      <a class="dropdown-item" onClick={this.select}>
                        Mr
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a class="dropdown-item" href="#" onClick={this.select}>
                        Mrs
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a class="dropdown-item" href="#" onClick={this.select}>
                        Miss
                      </a>
                    </li>
                  </ul>
                </div>

                <br />
                <input
                  class="form-control"
                  type="text"
                  id="inputUserName"
                  placeholder="First Name"
                  value={this.state.firstname}
                  onChange={(e) => {
                    let { firstname } = this.state.firstname;
                    firstname = e.target.value;
                    this.setState({ firstname });
                  }}
                />

                <br />
                <input
                  class="form-control"
                  type="text"
                  id="inputUserName"
                  placeholder="Last Name"
                  value={this.state.lasttname}
                  onChange={(e) => {
                    let { lastname } = this.state.lastname;
                    lastname = e.target.value;
                    this.setState({ lastname });
                  }}
                />
                <br />
                <input
                  class="form-control"
                  type="email"
                  id="inputUserName"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(e) => {
                    let { email } = this.state.email;
                    email = e.target.value;
                    this.setState({ email });
                  }}
                />
                <br />
                <textarea
                  class="form-control"
                  type="textarea"
                  placeholder="Enter Message"
                  rows="4"
                  value={this.state.message}
                  onChange={(e) => {
                    let { message } = this.state.message;
                    message = e.target.value;
                    this.setState({ message });
                  }}
                />
                <br />
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-2 ">
            <div className="sidebarContent">Right Side Bar</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contactus;
