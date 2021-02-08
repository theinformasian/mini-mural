import React from "react";
import { isEmpty } from "lodash";
import FontAwesomeButton from "../FontAwesomeButton";
import logo from "./logo.svg";
import "./styles.css";

class Welcome extends React.Component {
  render() {
    const { notes } = this.props;

    if (!isEmpty(notes)) return null; // if there are notes present, don't return this

    return (
      <div className="Welcome">
        <img src={logo} className="logo" alt="logo" />
        <FontAwesomeButton
          buttonClass={"close-modal"}
          faClass={"fa fa-times-circle-o"}
          label={"Add note"}
          handleOnClick={this.addButtonClick}
        />
        <div className="instructions">
          <p>Click on a color icon to add a note of that color.</p>
          <p>
            Edit Note: <span className="key">Double Click</span>
          </p>
          <p>
            Multiple Selection: <span className="key">Shift</span>
          </p>
          <p>
            Copy Notes: <span className="key">Ctrl</span> +{" "}
            <span className="key">C</span>
          </p>
          <p>
            Paste Notes: <span className="key">Ctrl</span> +{" "}
            <span className="key">V</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Welcome;
