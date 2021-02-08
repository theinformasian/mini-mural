import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import classnames from "classnames";
import "./styles.css";

class ColorBox extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string.isRequired,
    ariaAnnounce: PropTypes.func
  };

  handleClick = e => {
    const color = e.target.dataset.color;
    // const msg = color + ", selected";
    // this.props.ariaAnnounce(msg);
    console.log("ColorBox triggered, setting color: " + color);
    document.getElementById(color).focus();
    this.props.onClick(color);
    // const what = document.getElementById(this.props.color); // what does this even do
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
    const { color, active, colorName } = this.props;
    const className = classnames("colorBox", { activeBox: active });

    return (
      <button
        // role="button"
        // tabIndex="0"
        aria-label={colorName}
        className={className}
        onClick={this.handleClick}
        //  onKeyPressCapture={this.handleClick}
        data-color={color}
        id={color}
        style={{ background: color, border: this.getBorderStyle() }}
        autoFocus={active}
      />
    );
  }
}

export default ColorBox;
