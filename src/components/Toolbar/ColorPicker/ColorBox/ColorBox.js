import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import classnames from "classnames";
import {
  COLOR_PICKER_DEFAULT,
  COLOR_PICKER_NAMES
} from "../../../../constants";
import "./styles.css";

class ColorBox extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string.isRequired
  };

  handleClick = e => {
    const color = e.target.dataset.color;
    console.log("ColorBox triggered, setting color: " + color);
    this.props.onClick(color);
    document.getElementById(this.props.color);
  };

  getBorderStyle = () => {
    const { color, active } = this.props;
    let border;

    if (active) {
      const borderColor = Color(color)
        .darken(0.4)
        .desaturate(0.2);
      border = `2px solid ${borderColor}`;
    } else {
      border = "1px solid #bbbbbb";
    }

    return border;
  };

  render() {
    const { color, active } = this.props;
    const className = classnames("colorBox", { activeBox: active });
    const colorName = COLOR_PICKER_NAMES[COLOR_PICKER_DEFAULT.indexOf(color)];

    return (
      <div
        role="button"
        tabIndex="0"
        aria-label={colorName}
        className={className}
        onClick={this.handleClick}
        onKeyPressCapture={this.handleClick}
        data-color={color}
        id={color}
        style={{ background: color, border: this.getBorderStyle() }}
      />
    );
  }
}

export default ColorBox;
