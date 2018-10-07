import React, { Component } from "react";
import "./NoteForm.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: "",
      newNotePrice: "",
      modalIsOpen: false
    };
    this.handlePriceInput = this.handlePriceInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  // When the user input changes, set the newNoteContent
  // to the value of what's in the input box.
  handleUserInput(e) {
    this.setState({
      newNoteContent: e.target.value // the value of the text input
    });
  }
  handlePriceInput(e) {
    this.setState({
      newNotePrice: e.target.value
    });
  }

  writeNote() {
    // call a method that sets the noteContent for a note to
    // the value of the input
    this.props.addNote(this.state.newNoteContent, this.state.newNotePrice);

    // Set newNoteContent back to an empty string.
    this.setState({
      newNoteContent: "",
      newNotePrice: ""
    });
    window.location.reload();
  }

  render() {
    return (
      <div>
        <button className="noteButton" onClick={this.openModal}>
          Add Assets
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            Enter your Assets
          </h2>
          <button className="noteButton" onClick={this.closeModal}>
            close
          </button>

          <div className="formWrapper">
            Enter Title :
            <input
              className="noteInput"
              placeholder="Add Title of Item..."
              value={this.state.newNoteContent}
              onChange={this.handleUserInput}
            />
            <br />
            Enter Price:
            <input
              className="priceInput"
              placeholder="$$$$$"
              value={this.state.newNotePrice}
              onChange={this.handlePriceInput}
            />
            <br />
            <button className="noteButton" onClick={this.writeNote}>
              Add Asset
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NoteForm;
