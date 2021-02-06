import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

class FontAwesomeButton extends React.Component {
  static propTypes = {
    faClass: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired, // require a label for icon button
    handleOnClick: PropTypes.func
  };

  render() {
    const { faClass, label, handleOnClick } = this.props;
    return (
      <button aria-label={label} className="icon" onClick={handleOnClick}>
        <i className={faClass} aria-hidden="true" />
      </button>
    );
  }
}

export default FontAwesomeButton;
