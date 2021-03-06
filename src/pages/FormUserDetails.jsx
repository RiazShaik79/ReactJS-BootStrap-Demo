import React, { Component } from "react";

export class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 topbarContent">
            <h1>This is User Registration Page</h1>
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
              <h4 className="textColorBlack">Enter User Details</h4>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Username or Email"
                flotingLabelText="username"
                onChange={handleChange("username")}
                defaultValue={values.username}
              />
              <br />
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                flotingLabelText="password"
                onChange={handleChange("password")}
                defaultValue={values.password}
              />
              <br />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                flotingLabelText="cpassword"
                onChange={handleChange("cpassword")}
                defaultValue={values.cpassword}
              />
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                flotingLabelText="First Name"
                onChange={handleChange("firstName")}
                defaultValue={values.firstName}
              />
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                flotingLabelText="Last Name"
                onChange={handleChange("lastName")}
                defaultValue={values.lastName}
              />
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                flotingLabelText="email"
                onChange={handleChange("email")}
                defaultValue={values.email}
              />
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number ( with country code e.g., +44 for UK )"
                flotingLabelText="phone"
                onChange={handleChange("phone")}
                defaultValue={values.phone}
              />
              <br />
              <button
                className="btn btn-secondary form-control"
                onClick={this.continue}
              >
                Continue
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

export default FormUserDetails;

const styles = {
  button: {
    margin: 15,
  },
};
