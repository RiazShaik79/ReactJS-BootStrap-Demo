import React, { Component } from "react";
import EditFormUserDetails from "./EditFormUserDetails";
import EditFormPersonalDetails from "./EditFormPersonalDetails";
import Success from "./Success";
import Confirm from "./Confirm";
import axios from "axios";
import EditAddressForm1 from "../EditAddressForm1";
import EditUserDetailsSuccess from "./EditUserDetailsSuccess";
import EdiUserDetailsConfirm from "./EdiUserDetailsConfirm";

const APP_ID_HERE = "u2pf1yvgQxEfSjOMX7jZ";
const APP_CODE_HERE = "E53uzTEjWPtNAGW9uqVMxg";

export class EditUserForm extends Component {
  state = {
    step: 1,
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    cpassword: "",
    email: "",
    phone: "",
    occupation: "",
    dob: "",
    address_data: {
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      query: "",
      locationId: "",
      isChecked: false,
      coords: {},
    },
  };

  componentDidMount() {
    this.refreshState();
  }

  constructor(props) {
    super(props);

    this.state.address_data = this.getInitialState();
    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in an address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the check button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
    this.alert = this.alert.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  refreshState() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    const user = {
      username: localStorage.getItem("userName"),
    };

    console.log("user ", user);

    axios
      .post("http://localhost:8080/users/get", user, config)
      .then((response) => {
        this.setState({
          ...this.state.step,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          password: response.data.password,
          cpassword: response.data.cpassword,
          email: response.data.email,
          phone: response.data.phone,
          occupation: response.data.occupation,
          dob: response.data.dob,
          address_data: response.data.address_data,
        });
        console.log("response ", JSON.stringify(this.state));
      });
  }
  onQuery(evt) {
    const query = evt.target.value;
    console.log("Iam in onQuery function");

    if (!query.length > 0) {
      this.setState({ address_data: this.getInitialState() });
      return;
    }

    axios
      .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
        params: {
          app_id: APP_ID_HERE,
          app_code: APP_CODE_HERE,
          query: query,
          maxresults: 1,
        },
      })
      .then((response) => {
        if (response.data.suggestions.length > 0) {
          const id = response.data.suggestions[0].locationId;
          const address = response.data.suggestions[0].address;

          this.setState({
            address_data: {
              address: address,
              query: query,
              locationId: id,
            },
          });
        } else {
          const state = this.getInitialState();
          this.setState({ address_data: state });
        }
      });
  }

  getInitialState() {
    return {
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      query: "",
      locationId: "",
      isChecked: false,
      coords: {},
    };
  }

  onClear(evt) {
    const state = this.getInitialState();
    this.setState({ address_data: this.getInitialState() });
  }

  onAddressChange(evt) {
    const id = evt.target.id;
    const val = evt.target.value;

    let state = this.state.address_data;
    state.address[id] = val;
    this.setState({ address_data: state });
  }

  onCheck(evt) {
    let params = {
      app_id: APP_ID_HERE,
      app_code: APP_CODE_HERE,
    };

    if (this.state.address_data.locationId.length > 0) {
      params["locationId"] = this.state.address_data.locationId;
    } else {
      params["searchtext"] =
        this.state.address_data.address.street +
        this.state.address_data.address.city +
        this.state.address_data.address.state +
        this.state.address_data.address.postalCode +
        this.state.address_data.address.country;
    }
    console.log("address data " + this.state.address_data);
    axios
      .get("https://geocoder.api.here.com/6.2/geocode.json", { params: params })
      .then((response) => {
        const view = response.data.Response.View;
        if (view.length > 0 && view[0].Result.length > 0) {
          const location = view[0].Result[0].Location;

          this.setState({
            address_data: {
              isChecked: "true",
              locationId: "",
              query: location.Address.Label,
              address: {
                street:
                  location.Address.HouseNumber + " " + location.Address.Street,
                city: location.Address.City,
                state: location.Address.State,
                postalCode: location.Address.PostalCode,
                country: location.Address.Country,
              },
              coords: {
                lat: location.DisplayPosition.Latitude,
                lon: location.DisplayPosition.Longitude,
              },
            },
          });
        } else {
          this.setState({
            address_data: {
              address: this.state.address_data.address,
              isChecked: true,
              coords: this.state.address_data.coords,
            },
          });
        }
      })
      .catch((error) => {
        console.log("caught failed query");
        this.setState({
          address_data: {
            address: this.state.address_data.address,
            isChecked: true,
            coords: null,
          },
        });
      });
  }

  alert() {
    if (!this.state.address_data.isChecked) {
      return;
    }

    if (this.state.address_data.coords === null) {
      return (
        <div className="alert alert-warning" role="alert">
          <b>Invalid.</b> The address is not recognized.
        </div>
      );
    } else {
      return (
        <div className="alert alert-success" role="alert">
          <b>Valid Address.</b> Location is {this.state.address_data.coords.lat}
          , {this.state.address_data.coords.lon}.
        </div>
      );
    }
  }

  //proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  //go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    console.log("input " + input);
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    const { step } = this.state;
    const {
      username,
      password,
      cpassword,
      firstName,
      lastName,
      email,
      phone,
      occupation,
      dob,
    } = this.state;

    const values = {
      username,
      password,
      cpassword,
      firstName,
      lastName,
      email,
      phone,
      occupation,
      dob,
    };

    switch (step) {
      case 1:
        return (
          <EditFormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            userLoggedIn={this.props.userLoggedIn}
            handleLogout={this.props.handleLogout}
          />
        );
      case 2:
        return (
          <EditAddressForm1
            alert={this.alert}
            address_data={this.state.address_data}
            onAddressChange={this.onAddressChange}
            onClear={this.onClear}
            onCheck={this.onCheck}
            onQuery={this.onQuery}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            userLoggedIn={this.props.userLoggedIn}
            handleLogout={this.props.handleLogout}
          />
        );
      case 3:
        return (
          <EditFormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            userLoggedIn={this.props.userLoggedIn}
            handleLogout={this.props.handleLogout}
          />
        );
      case 4:
        return (
          <EdiUserDetailsConfirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            userdetails={this.state}
            userLoggedIn={this.props.userLoggedIn}
            handleLogout={this.props.handleLogout}
          />
        );
      case 5:
        return (
          <EditUserDetailsSuccess
            userLoggedIn={this.props.userLoggedIn}
            handleLogout={this.props.handleLogout}
          />
        );
    }
  }
}

export default EditUserForm;
