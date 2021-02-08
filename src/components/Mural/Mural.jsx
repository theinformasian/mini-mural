import React from "react";
import PropTypes from "prop-types";
import Toolbar from "../Toolbar";
import StickyNote from "../StickyNote";

import { NOTE_DEFAULT_HEIGHT, NOTE_DEFAULT_WIDTH } from "../../constants";
import { pixelsToInt } from "../../utils";
import "./styles.css";
import Welcome from "../Welcome";

class Mural extends React.Component {
  static propTypes = {
    notes: PropTypes.object,
    selectedNotes: PropTypes.object,
    currentColor: PropTypes.string,
    addNote: PropTypes.func,
    enableMultipleSelection: PropTypes.func,
    disableMultipleSelection: PropTypes.func,
    clearSelectedNotes: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.mural = React.createRef();
  }

  componentDidMount() {
    this.mural.current.addEventListener("click", this.clearSelectedNotes);
    this.mural.current.addEventListener("dblclick", this.addNoteToMural);
    this.mural.current.addEventListener("keydown", this.handleKeyDown);
    this.mural.current.addEventListener("keyup", this.handleKeyUp);
  }

  clearSelectedNotes = e => {
    if (e.target.isEqualNode(this.mural.current)) {
      this.props.clearSelectedNotes();
    }
  };

  addNoteToMural = e => {
    if (e.target.classList.contains("sticky-note-content")) {
      return;
    }

    const { x, y } = e;
    const { currentColor, addNote } = this.props;
    const width = NOTE_DEFAULT_HEIGHT;
    const height = NOTE_DEFAULT_WIDTH;

    var xPos, yPos;

    if (!(x | y)) {
      // if both x and y are 0
      xPos = 140 + Math.floor(Math.random() * (window.innerHeight - 280));
      yPos = 140 + Math.floor(Math.random() * (window.innerWidth - 280));
      /* KNOWN BUG: due to top left corner placement, a note could  
      * be placed somewhere that extends the window size, which then 
      * extends the max coordinate that can be used for placement*/
    } else {
      xPos = x;
      yPos = y;
    }

    const noteToAdd = {
      text: "",
      color: currentColor,
      width,
      height,
      x: xPos - pixelsToInt(width) / 2,
      y: yPos - pixelsToInt(height) / 2
    };

    addNote(noteToAdd);
  };

  handleKeyDown = e => {
    console.log("keydown on Mural");
    if (e.key === "Shift") {
      this.props.enableMultipleSelection();
    }
    // if (e.key === "Enter") {
    //   console.log("enter key pressed");
    //   // random new note props
    //   const note = {};
    //   this.addNoteToMural(note);
    // }
  };

  handleKeyUp = e => {
    if (e.key === "Shift") {
      this.props.disableMultipleSelection();
    }
  };

  render() {
    // displays all the notes currently in list
    const { notes, selectedNotes } = this.props;
    const StickyNotes = Object.values(notes).map(
      ({ id, text, color, width, height, x, y }) => {
        const selected = selectedNotes.hasOwnProperty(id);

        return (
          <StickyNote
            id={id}
            text={text}
            color={color}
            width={width}
            height={height}
            x={x}
            y={y}
            selected={selected}
            key={id}
          />
        );
      }
    );

    return (
      <div id="Mural" className="Mural" ref={this.mural}>
        <Welcome />
        {StickyNotes}
        <Toolbar addNoteToMural={this.addNoteToMural} />
      </div>
    );
  }
}

export default Mural;
