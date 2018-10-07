import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./login.css";
import { Redirect, Route, Switch } from "react-router";
import App from "./App";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  validateForm() {
    if (
      this.state.email === "hackiowa@gmail.com" &&
      this.state.password === "hello"
    ) {
      this.setState({
        redirect: true
      });
    } else {
      alert(
        "Wrong password and email. Email: hackiowa@gmail.com  password: hello"
      );
    }

    return (
      <Switch>
        <Route path="/app/" component={App} />
        <Redirect to="/app/" />
      </Switch>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };
  setRedirect = () => {
    this.validateForm();
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Switch>
          <Route path="/app/" component={App} />
          <Redirect to="/app/" />
        </Switch>
      );
    }
  };

  render() {
    let Background = "../static/insurance.jpg";
    var sectionStyle = {
      root: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
        overflow: "hidden"
      }
    };
    return (
      <div className="dance">
        <section style={sectionStyle} />
        {this.renderRedirect()}
        <div className="outerBox">
          <div className="loginBox">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Passwords</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                // disabled={!this.validateForm()}
                onClick={this.setRedirect}
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
