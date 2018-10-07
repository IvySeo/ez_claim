import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import chat_styles from "./../Config/chatstyles";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      problem: "",
      email: ""
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, problem, email } = steps;

    this.setState({ name, problem, email });
  }

  render() {
    const { name, problem, email } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Problem</td>
              <td>{problem.value}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object
};

Review.defaultProps = {
  steps: undefined
};

class SimpleForm extends Component {
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd() {
    console.log("add fetch post here");
  }
  render() {
    return (
      <ThemeProvider theme={chat_styles}>
        <ChatBot
          width="350px"
          headerTitle="EZ Claim Support"
          placeholder="Ask for help"
          floating="true"
          handleEnd={this.handleEnd}
          steps={[
            {
              id: "1",
              message:
                "Welcome to EZ Claim Support ChatBot, What is your name?",
              trigger: "name"
            },
            {
              id: "name",
              user: true,
              trigger: "3"
            },
            {
              id: "3",
              message: "Hi {previousValue}! What is your problem related to?",
              trigger: "problem"
            },
            {
              id: "problem",
              options: [
                { value: "Claim", label: "Claim", trigger: "5" },
                { value: "Status", label: "Status", trigger: "5" }
              ]
            },
            {
              id: "5",
              message: "What is your email?",
              trigger: "email"
            },
            {
              id: "email",
              user: true,
              trigger: "7"
            },
            {
              id: "7",
              message: "Do you want to request help?",
              trigger: "update-question"
            },
            {
              id: "review",
              component: <Review />,
              asmessage: true,
              trigger: "update"
            },
            {
              id: "update",
              message: "Would you like to add some detailed description?",
              trigger: "update-question"
            },
            {
              id: "update-question",
              options: [
                { value: "yes", label: "Yes", trigger: "end-message" },
                {
                  value: "no",
                  label: "No, add problem description",
                  trigger: "update-no"
                }
              ]
            },
            {
              id: "update-no",
              message: "What description would you like to add?",
              trigger: "update-fields"
            },
            {
              id: "update-fields",
              options: [
                { value: "name", label: "Name", trigger: "update-name" },
                {
                  value: "problem",
                  label: "Problem",
                  trigger: "update-problem"
                },
                { value: "email", label: "email", trigger: "update-email" }
              ]
            },
            {
              id: "update-name",
              update: "name",
              trigger: "7"
            },
            {
              id: "update-problem",
              update: "problem",
              trigger: "7"
            },
            {
              id: "update-email",
              update: "email",
              trigger: "7"
            },
            {
              id: "end-message",
              message:
                "Thanks! Your request has been sent to our support team!",
              end: true
            }
          ]}
        />
      </ThemeProvider>
    );
  }
}

export default SimpleForm;
