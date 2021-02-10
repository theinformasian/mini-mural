import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

class FontAwesomeButton extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    buttonClass: PropTypes.string,
    faClass: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired, // require a label for icon button
    handleOnClick: PropTypes.func,
    menuButton: PropTypes.bool
  };

  // the HACKIEST workaround...re-hide announcements when focus moves off a FontAwesomeButton
  // handleOnBlur = e => {
  //   document
  //     .getElementById("announcements")
  //     .setAttribute("aria-hidden", "true");
  // };

  /** // onClick={handleOnClick} */
  render() {
    const { id, buttonClass, faClass, label, handleOnClick } = this.props;
    return (
      <button
        id={id}
        aria-label={label}
        className={buttonClass}
        onClick={handleOnClick}
        onBlur={this.handleOnBlur}
      >
        <i className={faClass} aria-hidden="true" />
      </button>
    );
  }
}

export default FontAwesomeButton;
