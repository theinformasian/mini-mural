import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Color from "color";
import FontAwesomeButton from "../FontAwesomeButton";
import "./styles.css";
class StickyNote extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    selected: PropTypes.bool,
    setSelectedNote: PropTypes.func,
    pushSelectedNote: PropTypes.func,
    updateNote: PropTypes.func,
    deleteNote: PropTypes.func
  };

  static defaultProps = {
    text: "",
    color: "#b1d6d0",
    height: "100px",
    width: "100px",
    x: "0",
    y: "0",
    selected: false
  };

  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.state = { editMode: false };
  }

  componentDidMount() {
    this.textarea.current.addEventListener("focus", this.selectNote, true);
    this.textarea.current.addEventListener("blur", this.handleOnBlur, true);
    this.textarea.current.addEventListener("click", this.selectNote);
    this.textarea.current.addEventListener("dblclick", this.editNote);
    // possible performance issues, if it's always listening for keyups and checking if they're 'enter'
  }

  keyPressed = e => {
    //it triggers by pressing the enter key
    console.log("key pressed");
    if (e.keyCode === 13) {
      this.editNote;
    }
  };

  selectNote = e => {
    const {
      id,
      setSelectedNote,
      pushSelectedNote,
      multipleSelection
    } = this.props;

    if (multipleSelection) {
      pushSelectedNote(id);
    } else {
      setSelectedNote(id);
    }
  };

  editNote = () => {
    this.setState({ editMode: true });
    this.textarea.current.focus();
  };

  handleDelete = () => {
    const { id, deleteNote } = this.props;
    deleteNote(id);
  };

  handleOnBlur = e => {
    const text = this.props.text;
    const updatedText = e.target.textContent;

    if (text !== updatedText) {
      const { id, color, height, width, x, y, selected } = this.props;
      const updatedNote = {
        id,
        text: updatedText,
        color,
        height,
        width,
        x,
        y,
        selected
      };
      this.props.updateNote(updatedNote);
    }

    this.setState({ editMode: false });
  };

  render() {
    const { editMode } = this.state;
    const { id, text, color, height, width, x, y, selected } = this.props;

    const StickyNoteClassnames = classnames("StickyNote", {
      selected: selected,
      "edit-mode": editMode
    });

    const textColor = Color(color)
      .darken(0.4)
      .desaturate(0.3);
    const boxShadowColor = Color(color).darken(0.1);

    return (
      <div
        className={StickyNoteClassnames}
        style={{
          width,
          height,
          transform: `translate(${x}px,${y}px)`,
          zIndex: selected ? "999999" : 1
        }}
      >
        <div
          className="container"
          style={{
            background: color,
            boxShadow: `0px 0px 2px ${boxShadowColor}`,
            padding: selected ? "6px" : "8px"
          }}
          id={id}
          data-type="sticky-note"
          aria-label="Sticky note"
        >
          <p
            className="sticky-note-content"
            contentEditable={editMode}
            onBlur={this.handleOnBlur}
            ref={this.textarea}
            style={{ color: textColor, userSelect: editMode ? "text" : "none" }}
            suppressContentEditableWarning="true"
            tabIndex="0"
            onKeyPress={this.keyPressed}
          >
            {text}
          </p>
        </div>
        {selected && (
          <FontAwesomeButton
            faClass={"fa fa-trash-o"}
            label={"delete"}
            handleOnClick={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

export default StickyNote;
