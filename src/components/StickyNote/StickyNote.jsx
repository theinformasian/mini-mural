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
    clearSelectedNote: PropTypes.func,
    updateNote: PropTypes.func,
    deleteNote: PropTypes.func,
    announce: PropTypes.func
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
    // this.textarea.current.addEventListener("keydown", this.handleKeyDown);
    // possible performance issues, if it's always listening for keyups and checking if they're 'enter'
  }

  componentWillUnmount() {
    // if note is being removed, set focus to next element
    // console.log("sticky note unmounting!");
    // this.textarea.current.nextElementByTabIndex.focus();
  }

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
    this.props.announce("Editing note");
    this.textarea.current.focus();
  };

  handleDelete = () => {
    const { id, deleteNote } = this.props;
    this.props.announce("Note deleted.");
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
      .darken(0.7)
      .desaturate(0.1);
    const boxShadowColor = Color(color).darken(0.3);
    const h3Id = id + "-h3";
    const pId = id + "-p";

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
        <button
          className="container"
          style={{
            background: color,
            outline: selected ? "3px ${textColor}" : "1px ${boxShadowColor}",
            // boxShadow: `0px 0px 1px 3px ${boxShadowColor}`,
            padding: selected ? "6px" : "8px"
          }}
          id={id}
          data-type="sticky-note"
          aria-labelledby={`${h3Id} ${pId}`}
          onClick={this.editNote}
        >
          <h3 id={h3Id}>Sticky Note</h3>
          <p
            id={pId}
            className="sticky-note-content"
            contentEditable={editMode}
            onBlur={this.handleOnBlur}
            ref={this.textarea}
            style={{ color: textColor, userSelect: editMode ? "text" : "none" }}
            suppressContentEditableWarning="true"
            tabIndex="0"
          >
            {text}
          </p>
        </button>
        {selected && (
          <FontAwesomeButton
            buttonClass={"icon"}
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
