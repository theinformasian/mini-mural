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

  handleClick = e => {
    this.props.addNoteToMural(e);
  };

  render() {
    return (
      <div className="Toolbar">
        <ColorPicker />
        <FontAwesomeButton
          buttonClass={"icon toolbar-add-button"}
          faClass={"fa fa-plus-circle"}
          label={"Add note"}
          handleOnClick={this.handleClick}
        />
        <ClipboardManager />
      </div>
    );
  }
}

export default Toolbar;
