import React from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import ColorBox from "./ColorBox";
import { COLOR_PICKER_DEFAULT, COLOR_PICKER_NAMES } from "../../../constants";
import "./styles.css";

class ColorPicker extends React.Component {
  static propTypes = {
    setColor: PropTypes.func
  };

  pickColor = color => {
    this.props.setColor(color);
  };

  render() {
    const { currentColor } = this.props;
    const colorBoxes = COLOR_PICKER_DEFAULT.map(color => (
      <ColorBox
        color={color}
        colorName={COLOR_PICKER_NAMES[COLOR_PICKER_DEFAULT.indexOf(color)]}
        onClick={this.pickColor}
        active={currentColor === color}
        key={uniqueId()}
        ariaAnnounce={this.props.ariaAnnounce}
      />
    ));

    return <div className="ColorPicker">{colorBoxes}</div>;
  }
}

export default ColorPicker;
