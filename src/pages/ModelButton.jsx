import React, { Component } from "react";
import axios from "axios";
import StarRating from "./StarRating";

class ModelButton extends Component {
  state = {
    feedbacks: [],
    feedback: {
      productId: "",
      customerName: "",
      desp: "",
      rating: 0,
    },
  };

  constructor(props) {
    super(props);
    this.getCustomerProductFeedbacks = this.getCustomerProductFeedbacks.bind(
      this
    );

    this.submitCustomerFeedback = this.submitCustomerFeedback.bind(this);

    this.state.feedback.productId = this.props.product.name;
    this.state.feedback.customerName = localStorage.getItem("userName");

    this.clear = this.clear.bind(this);
  }

  getCustomerProductFeedbacks() {
    axios
      .get("http://localhost:8080/customerFeedbacks/" + this.props.product.name)
      .then((response) => {
        this.setState({ feedbacks: response.data });
        console.log("feedbacks " + JSON.stringify(this.state.feedbacks));
      });
  }

  submitCustomerFeedback() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };
    console.log("feedback submitted ", this.state.feedback);
    axios
      .post(
        "http://localhost:8080/customerFeedbacks/",
        this.state.feedback,
        config
      )
      .then((response) => {
        console.log(response.data);
      });
  }

  clear() {
    this.setState({ feedback: { ...this.state.feedback, desp: " " } });
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
                <button
                  className="btn btn-outline-primary btn-sm"
                  data-toggle="modal"
                  data-target={"#" + "A" + this.props.product.name}
                  disabled={this.props.disabled}
                  onClick={this.clear}
                >
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
        <div
          className="modal"
          id={"A" + this.props.product.name}
          tabindex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">
                  Enter Customer Feedback for {this.props.product.name}
                </div>
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
                <textarea
                  class="form-control"
                  type="textarea"
                  placeholder="Enter customer feeback"
                  rows="4"
                  value={this.state.message}
                  onChange={(e) => {
                    let { message } = this.state.feedback.desp;
                    message = e.target.value;
                    this.setState({
                      feedback: { ...this.state.feedback, desp: message },
                    });
                  }}
                />
                <br />
                <b>Rate this product </b>
                <StarRating currentRating={0} numberOfStars="5" />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={this.submitCustomerFeedback}
                  data-dismiss="modal"
                >
                  Submit feedback
                </button>
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
