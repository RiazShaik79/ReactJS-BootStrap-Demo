//import React from "react";

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.css";
import CoursesCRUD from "./pages/courses";
//import Login from "./pages/login-backup";
import Home from "./Home";
import About from "./About";
import Contactus from "./Contactus";
import Products from "./Products";
import OrdersForm from "./pages/OrdersForm";
import SignInForm from "./pages/signInForm";
import SignUpForm from "./pages/UserForm";
import MyCart from "./pages/MyCartForm";
import ProductsForm from "./pages/ProductsForm";
import MyCartForm from "./pages/MyCartForm";
//import MyApp from "./MyPaypalExpressBtn.jsx";
import EditUserForm from "./pages/EditUserForm";

class App extends Component {
  state = {
    username: "",
    token: "",
    userLoggedIn: false,
    userRole: "",
  };

  constructor(props) {
    super(props);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLoggedIn(username, data) {
    console.log("Im from handlelogged in");
    this.setState({ token: data });
    this.setState({ username: username });

    localStorage.setItem("userName", this.state.username);
    localStorage.setItem("userLoggedInState", this.state.userLoggedIn);
    localStorage.setItem("userToken", this.state.token);

    if (this.state.token.length > 20) {
      this.setState({ userLoggedIn: true });
      localStorage.setItem("userLoggedInState", true);
      this.props.history.push("/");
    }
  }

  handleLogout() {
    console.log("im from Logout");
    this.setState({ userLoggedIn: false });
    localStorage.removeItem("userLoggedInState");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");

    this.props.history.push("/");
  }

  render() {
     if (this.state.userLoggedIn) {
      console.log("im from app1 js redirect");
      return (
        <div className="App1">
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                counter={this.state.counter}
                username={localStorage.getItem("userName")}
                handleLogout={this.handleLogout}
                userLoggedIn={localStorage.getItem("userLoggedInState")}
              />
            )}
          />
        </div>
      );
    }
    return (
      <React.Fragment>
        <Router>
          <div className="App1">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    {...props}
                    username={localStorage.getItem("userName")}
                    handleLogout={this.handleLogout}
                    userLoggedIn={localStorage.getItem("userLoggedInState")}
                    userhandleLogout={this.handleLogout}
                  />
                )}
              />
              <Route path="/about" render={(props) => <About />} />

              <Route
                path="/contactus"
                render={(props) => <Contactus {...props} />}
              />

              <Route
                path="/sign-in"
                render={(props) => (
                  <SignInForm {...props} handleLoggedIn={this.handleLoggedIn} />
                )}
              />
              <Route path="/sign-up" component={SignUpForm}></Route>

              <Route
                path="/products"
                render={(props) => (
                  <ProductsForm
                    {...props}
                    username={localStorage.getItem("userName")}
                    token={localStorage.getItem("userToken")}
                    userLoggedIn={localStorage.getItem("userLoggedInState")}
                    handleLogout={this.handleLogout}
                  />
                )}
              />
              <Route path="/edituser" component={EditUserForm}></Route>
              <Route
                path="/mycart"
                render={(props) => (
                  <MyCartForm
                    {...props}
                    username={localStorage.getItem("userName")}
                    token={localStorage.getItem("userToken")}
                    userLoggedIn={localStorage.getItem("userLoggedInState")}
                    handleLogout={this.handleLogout}
                  />
                )}
              />

              <Route
                path="/orders"
                render={(props) => (
                  <OrdersForm
                    {...props}
                    username={localStorage.getItem("userName")}
                    token={localStorage.getItem("userToken")}
                    userLoggedIn={localStorage.getItem("userLoggedInState")}
                    handleLogout={this.handleLogout}
                  />
                )}
              />

              <Route
                path="/topics"
                render={(props) => () =>
                  localStorage.getItem("userLoggedInState") ? (
                    <CoursesCRUD
                      {...props}
                      token={localStorage.getItem("userToken")}
                      handleLogout={this.handleLogout}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
              />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
