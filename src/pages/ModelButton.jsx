import React, { Component } from "react";
import axios from "axios";

class ModelButton extends Component {
  state = {
    feedbacks: [],
  };

  constructor(props) {
    super(props);
    this.getCustomerProductFeedbacks = this.getCustomerProductFeedbacks.bind(
      this
    );
  }

  getCustomerProductFeedbacks() {
    console.log("Iam in customer feedback function" + this.props.product.name);

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    axios
      .get(
        "http://localhost:8080/customerFeedbacks/" + this.props.product.name,
        config
      )
      .then((response) => {
        this.setState({ feedbacks: response.data });
        console.log("feedbacks " + JSON.stringify(this.state.feedbacks));
      });
  }

  render() {
    let feedbacks = this.state.feedbacks.map((feedback) => {
      return (
        <li>
          {feedback.customerName} {":"} {feedback.desp} {" Rating:"}{" "}
          {feedback.rating}
        </li>
      );
    });
    return (
      <div>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm btn-block my-2"
          data-toggle="modal"
          data-target={"#" + this.props.product.name}
          onClick={this.getCustomerProductFeedbacks}
        >
          Product Details
        </button>

        <div
          className="modal fade"
          id={this.props.product.name}
          tabindex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.props.product.name}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src="https://picsum.photos/100"></img>
                <br />
                <br />
                <p>{this.props.product.desp}</p>
                <p>This is a demo description!.. </p>
                <br />
                <b>Customer Reivews </b>
                <ul>{feedbacks}</ul>
                <br />
                <button className="btn btn-outline-primary btn-sm">
                  Write a Customer Review
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModelButton;
