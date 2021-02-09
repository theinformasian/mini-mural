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
    // handle screen reader announcement
    const { colorName } = this.props;
    const msg = colorName + ", selected";
    this.props.ariaAnnounce(msg);

    // set state current_color
    const color = e.target.dataset.color;
    this.props.onClick(color);

    // set focus back to this button
    document.getElementById(color).focus();
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
        aria-label={colorName}
        className={className}
        onClick={this.handleClick}
        data-color={color}
        id={color}
        style={{ background: color, border: this.getBorderStyle() }}
        autoFocus={active}
      />
    );
  }
}

export default ColorBox;
