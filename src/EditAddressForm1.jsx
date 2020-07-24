import React, { Component } from "react";
import AddressSuggest from "./AddressSuggest";
import AddressInput from "./AddressInput";

class EditAddressForm1 extends Component {
  constructor(props) {
    super(props);
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  onCheck = (e) => {
    e.preventDefault();
    this.props.onCheck();
  };

  onClear = (e) => {
    e.preventDefault();
    this.props.onClear();
  };

  render() {
    let result = this.props.alert();
    console.log("reRending address form");
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 topbarContent">
            <h1>This is Edit User Details Page</h1>
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
            <form className="form-group">
              <h4 className="textColorBlack">Edit Address Details</h4>
              <br />
              <div className="container textColorBlack">
                <AddressSuggest
                  query={this.props.address_data.query}
                  onChange={this.props.onQuery}
                />
                <AddressInput
                  street={this.props.address_data.address.street}
                  city={this.props.address_data.address.city}
                  state={this.props.address_data.address.state}
                  postalCode={this.props.address_data.address.postalCode}
                  country={this.props.address_data.address.country}
                  onChange={this.props.onAddressChange}
                />
                {result}
                <button
                  type="submit"
                  className="btn btn-primary my-2"
                  onClick={this.onCheck}
                >
                  Check
                </button>{" "}
                <button
                  type="submit"
                  className="btn btn-outline-secondary my-2"
                  onClick={this.onClear}
                >
                  Clear
                </button>
                <br />
                <button className="btn btn-secondary" onClick={this.continue}>
                  Continue
                </button>{" "}
                <button className="btn btn-secondary" onClick={this.back}>
                  Back
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

export default EditAddressForm1;
