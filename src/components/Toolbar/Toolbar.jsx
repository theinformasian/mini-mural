import React from "react";
import PropTypes from "prop-types";
import ClipboardManager from "../ClipboardManager";
import FontAwesomeButton from "../FontAwesomeButton";
import ColorPicker from "./ColorPicker";
import "./styles.css";

class Toolbar extends React.Component {
  static propTypes = {
    addNoteToMural: PropTypes.func
  };

  addButtonClick = e => {
    this.props.addNoteToMural(e);
  };

  // helpButtonClick = e => {
  //   console.log("Help is on the way! Eventually!");
  //   // TODO: remove display none from Welcome, add placement styling
  //   // set focus to first focusable element, aka close button
  // };

  render() {
    return (
      <div className="Toolbar" role="Toolbar" aria-label="Mural App Toolbar">
        <ColorPicker ariaAnnounce={this.props.ariaAnnounce} />
        <ClipboardManager />
        <div className="Actions">
          <FontAwesomeButton
            id={"add-note-button"}
            buttonClass={"icon toolbar-add-button"}
            faClass={"fa fa-plus-circle"}
            label={"Add note"}
            handleOnClick={this.addButtonClick}
          />
          <FontAwesomeButton
            id={"help-button"}
            buttonClass={"icon toolbar-add-button"}
            faClass={"fa fa-question-circle"}
            label={"Help"}
            handleOnClick={this.props.helpButton}
            menuButton={true}
          />
        </div>
      </div>
    );
  }
}

export default Toolbar;
