import React, { Component } from "react";
import { DB_CONFIG } from "../Config/config";
import firebase from "firebase/app";
import "firebase/database";
import "./App.css";
import { NavLink, Switch, Route } from "react-router-dom";
import Note from "../Note/Note";
import NoteForm from "../NoteForm/NoteForm";
import Chat from "./chat";
import chat_styles from "./../Config/chatstyles";
import { ThemeProvider } from "styled-components";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideChatBot: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ hideChatBot: true });
  }
  render() {
    const displayChat = this.state.hideChatBot ? { display: "none" } : {};
    return (
      <div className="app">
        <Navigation />
        <Main />

        <ThemeProvider theme={chat_styles}>
          <Chat />
        </ThemeProvider>
      </div>
    );
  }
}

class Navigation extends Component {
  // executeRefresh = {};
  render() {
    return (
      <nav>
        <ul>
          <li>
            <NavLink
              exact
              activeClassName="current"
              to="/app"
              onClick={this.forceUpdate}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="current"
              onClick={this.forceUpdate}
              to="/app/claim"
            >
              Claim
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="current" to="/app/contact">
              About us
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div />;
  }
}

class Claim extends Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("notes");

    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
      hasTriggered: true
    };
  }

  handleChange(e) {
    this.setState({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0])
    });
  }

  // componentDidMount() {
  //   const ref = database.ref().child(this.state.user.uid);
  //   ref.on("child_added", child => {
  //     let images = this.state.images.slice();
  //     images.push({
  //       key: child.key,
  //       url: child.val().url
  //     });
  //     this.setState({ images });
  //   });
  //   ref.on("child_removed", child => {
  //     let images = this.state.images.filter(image => {
  //       return image.url != child.val().url;
  //     });
  //     this.setState({ images });
  //   });
  // }

  componentWillMount() {
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on("child_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
        notePrice: snap.val().notePrice
      });

      this.setState({
        notes: previousNotes
      });
    });

    this.database.on("child_removed", snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      });
    });
  }

  addNote(note, price) {
    this.database.push().set({ noteContent: note, notePrice: price });
  }

  removeNote(noteId) {
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
        <div className="notesHeader">
          <div className="heading" />
        </div>
        <div className="notesBody">
          {this.state.notes.map(note => {
            return (
              <div>
                <Note
                  noteContent={note.noteContent}
                  notePrice={note.notePrice}
                  noteId={note.id}
                  key={note.id}
                  removeNote={this.removeNote}
                />
              </div>
            );
          })}
        </div>
        <br />
        <p />
      </div>
    );
  }
}

const Contact = () => (
  <div className="contact">
    <br />
    <br />
    <h4>Ez-Claim, Inc.</h4>
    <p>720 4th Aves S, St Cloud, MN 56301</p>
    <br />
    <h4>Slogan</h4>
    <p>The Pledge of Excellence</p>
    <br />
    <h4>Description</h4>
    <p>
      EZ-Claim, Inc. is a risk management company Tenants/Home owners manage
      their risk issues effectively and ensure the claim process is very smooth
      during thier recovery period.
    </p>
    <br />
    <h4>Mission Statement</h4>
    <p>
      We want to help consumers as well as the insurance providers with claims
      in addition to making the claims process work better for everyone.
    </p>
    <br />
    <h4>Contact us</h4>
    <p>
      email: support@ezclaim.com <br />
      phone: 012-345-6789 <br />
      social media:
    </p>

    <a href="http://www.facebook.com/">
      <img
        class="logo"
        src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png"
        height="50"
        weidth="50"
        alt="facebook"
      />
    </a>

    <a href="http://www.instagram.com/">
      <img
        class="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMwWGjZ7nlKOYRbvHyEJGCJ_LAbkeGjSMysw6E8ZDiXU9MNyz"
        height="50"
        weidth="50"
        alt="Instagram"
      />
    </a>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path="/app" component={Home} />
    <Route exact path="/app/claim" component={Claim} />
    <Route exact path="/app/contact" component={Contact} />
  </Switch>
);

export default App;
