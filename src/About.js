import React from "react";
import "./App.css";

function About() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 topbarContent">
          <h1>This is About Page</h1>
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
            <li class="nav-item active">
              <a class="nav-link" href="\about">
                About
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
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
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
          <br />
          <div className="card textColorBlack">
            <div className="card-header">
              <h4>Introduction</h4>
            </div>
            <div className="card-body">
              <h5>This web application is built using,</h5>

              <ol>
                <li className="list-group-item">
                  ReactJS, Redux, BootStrap (Web)
                </li>
                <li className="list-group-item">
                  Springboot (Backend Applications - Microservices)
                </li>
                <li className="list-group-item">
                  MySQL, MongoDB(Backend DB servers)
                </li>
                <li className="list-group-item">ActiveMQ - (MQ)</li>
                <li className="list-group-item">
                  Jenkins (DevOps - Automated Deployments)
                </li>
                <li className="list-group-item">AWS (Cloud deployments)</li>
              </ol>

              <h6>We are learning and developing web applications!...</h6>
            </div>
          </div>
        </div>

        <div className="col-md-2 ">
          <div className="sidebarContent">Right Side Bar</div>
        </div>
      </div>
    </div>
  );
}

export default About;
