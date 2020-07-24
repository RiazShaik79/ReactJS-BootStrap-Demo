import React, { Component } from "react";
class UserButton extends Component {
  constructor(props) {
    super(props);
  }

  onEditUserClick() {
    this.props.history.push("/edituser");
  }

  render() {
    let classesLogOut = "dropdown-item disabled ";
    let classesLogIn = "dropdown-item";

    if (localStorage.getItem("userLoggedInState")) {
      classesLogOut = "dropdown-item";
      classesLogIn = "dropdown-item disabled";
    }
    return (
      <div className="dropdown">
        <button
          className="btn btn-primary btm-sm btn-block dropdown-toggle"
          data-toggle="dropdown"
        >
          <span className="glyphicon glyphicon-user "></span>
          {localStorage.getItem("userName")} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li>
            {" "}
            <a class={classesLogOut} href="/edituser">
              Edit User
            </a>
          </li>
          <div class="dropdown-divider"></div>

          <li>
            {" "}
            <a class={classesLogOut} href="/" onClick={this.props.handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserButton;
