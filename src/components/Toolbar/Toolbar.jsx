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

  helpButtonClick = e => {
    console.log("Help is on the way! Eventually!");
  };

  render() {
    return (
      <div className="Toolbar">
        <ColorPicker />
        <ClipboardManager />
        <div className="Actions">
          <FontAwesomeButton
            buttonClass={"icon toolbar-add-button"}
            faClass={"fa fa-plus-circle"}
            label={"Add note"}
            handleOnClick={this.addButtonClick}
          />
          <FontAwesomeButton
            buttonClass={"icon toolbar-add-button"}
            faClass={"fa fa-question-circle"}
            label={"Help"}
            handleOnClick={this.helpButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default Toolbar;
