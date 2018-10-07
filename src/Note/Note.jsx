import React, { Component } from "react";
import "./Info.css";
import PropTypes from "prop-types";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.notePrice = props.notePrice;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  render() {
    return (
      <div className="note fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.noteId)}
        >
          &times;
        </span>
        <p className="noteContent">
          <strong>Item</strong>
          {" " + this.noteContent + " "}
          <strong> Price: </strong> {" " + "  " + this.notePrice}
        </p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string,
  notePrice: PropTypes.string
};

export default Note;
