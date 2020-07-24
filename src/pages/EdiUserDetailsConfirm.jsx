import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";

export class EdiUserDetailsConfirm extends Component {
  constructor(props) {
    super(props);
  }

  continue = (e) => {
    e.preventDefault();
    //process form i.e. send your data to api etc.

    console.log("user details ", this.props.userdetails);
    axios
      .put("http://localhost:8080/users", this.props.userdetails)
      .then((response) => {
        console.log(response.data);
      });
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 topbarContent">
            <h1>This is Edit User Page</h1>
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
            <MuiThemeProvider>
              <div>
                <h4 className="textColorBlack">Confrim User Data</h4>
                <List>
                  <ListItem
                    primaryText="First Name"
                    secondaryText={this.props.userdetails.firstName}
                  />
                  <ListItem
                    primaryText="Last Name"
                    secondaryText={this.props.userdetails.lastName}
                  />
                  <ListItem
                    primaryText="Email"
                    secondaryText={this.props.userdetails.email}
                  />
                  <ListItem
                    primaryText="Phone"
                    secondaryText={this.props.userdetails.phone}
                  />
                  <ListItem
                    primaryText="Occupation"
                    secondaryText={this.props.userdetails.occupation}
                  />
                  <ListItem
                    primaryText="Date of Birth"
                    secondaryText={this.props.userdetails.dob}
                  />
                  <ListItem primaryText="Address" secondaryText={""} />
                  <ListItem
                    primaryText="Street"
                    secondaryText={
                      this.props.userdetails.address_data.address.street
                    }
                  />
                  <ListItem
                    primaryText="City"
                    secondaryText={
                      this.props.userdetails.address_data.address.city
                    }
                  />
                  <ListItem
                    primaryText="Postcode"
                    secondaryText={
                      this.props.userdetails.address_data.address.postalCode
                    }
                  />
                </List>
                <ListItem
                  primaryText="Country"
                  secondaryText={
                    this.props.userdetails.address_data.address.country
                  }
                />

                <br />
                <RaisedButton
                  label="Confrim & Continue"
                  primary={true}
                  style={styles.button}
                  onClick={this.continue}
                />
                <RaisedButton
                  label="Back"
                  primary={false}
                  style={styles.button}
                  onClick={this.back}
                />
              </div>
            </MuiThemeProvider>
          </div>
          <div className="col-md-2 ">
            <div className="sidebarContent">Right Side Bar</div>
          </div>
        </div>
      </div>
    );
  }
}

export default EdiUserDetailsConfirm;

const styles = {
  button: {
    margin: 15,
  },
};
