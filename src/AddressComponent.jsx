import React, { Component } from "react";
import { GoogleComponent } from "react-google-location";

const API_KEY = "AIzaSyAm3vYTZllrOzwFbkSLas9bGSMyxfp-5Ds";

class AddressComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
    };
  }
  render() {
    console.log("Place ", this.state.place);
    return (
      <div className="textColorBlack">
        <GoogleComponent
          apiKey={API_KEY}
          language={"en"}
          country={"country:uk"}
          coordinates={true}
          placeholder={"Start typing location"}
          //  locationBoxStyle={"custom-style"}
          //  locationListStyle={"custom-style-list"}
          onChange={(e) => {
            this.setState({ place: e });
          }}
        />
      </div>
    );
  }
}

export default AddressComponent;
