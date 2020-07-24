import React, { Component } from "react";
import AddressForm from "../AddressForm";

export class EditFormPersonalDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
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
              <h4 className="textColorBlack">Edit Personal Details</h4>
              <br />
              <label> Occupation </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Occupation"
                flotingLabelText="Occupation"
                onChange={handleChange("occupation")}
                defaultValue={values.occupation}
              />
              <br />
              <label> Date of Birth </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Date of Birth (dob in yyyy-mm-dd format)"
                flotingLabelText="Bio"
                onChange={handleChange("dob")}
                defaultValue={values.dob}
              />
              <br />
              <button className="btn btn-secondary" onClick={this.continue}>
                Continue
              </button>{" "}
              <button className="btn btn-secondary" onClick={this.back}>
                Back
              </button>
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

export default EditFormPersonalDetails;

const styles = {
  button: {
    margin: 15,
  },
};
