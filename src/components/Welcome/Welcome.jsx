import React from "react";
import { isEmpty } from "lodash";
import FontAwesomeButton from "../FontAwesomeButton";
import logo from "./logo.svg";
import "./styles.css";

class Welcome extends React.Component {
  render() {
    const { notes, closeButton, show } = this.props;

    const showHideClassName = show ? "Welcome" : "display-none";

    const displayStyle = show ? "flex" : "none";

    /** Allowing to display even when notes are present,
     * but it will cover up existing notes under it while
     * modal implementation not complete. Later, return
     * a modal version of itself here.
     * */
    // if (!isEmpty(notes)) return null; // if there are notes present, don't return this

    return (
      <div
        className={showHideClassName}
        id="welcome"
        title="Mural Instructions"
        aria-label="Mural Instructions"
      >
        <img src={logo} className="logo" alt="logo" aria-hidden="true" />
        <FontAwesomeButton
          id={"close-modal-button"}
          buttonClass={"close-modal"}
          faClass={"fa fa-times"}
          label={"Mural Instructions, Close modal"}
          handleOnClick={closeButton}
          style={{ display: displayStyle }}
        />
        <div className="instructions">
          <p>
            Add Note: <span className="key">Double Click</span> Mural Canvas
          </p>
          <p>
            Edit Note: <span className="key">Double Click</span> Note
          </p>
          <p>
            Multiple Selection: <span className="key">Shift</span> + Click
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
