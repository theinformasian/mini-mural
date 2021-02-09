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
    this.srContent = React.createRef();
    this.state = {
      modalShow: true
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.mural.current.addEventListener("click", this.clearSelectedNotes);
    this.mural.current.addEventListener("dblclick", this.addNoteToMural);
    this.mural.current.addEventListener("keydown", this.handleKeyDown);
    this.mural.current.addEventListener("keyup", this.handleKeyUp);
  }

  ariaAnnounce = content => {
    const ariaLiveRegion = this.srContent.current;
    ariaLiveRegion.setAttribute("aria-hidden", "false"); // reveal to SR
    ariaLiveRegion.innerHTML = ""; // clear previous
    window.setTimeout(function() {
      ariaLiveRegion.innerHTML = content;
    }, 100);
  };

  showModal = () => {
    this.setState({ modalShow: true });
    this.ariaAnnounce("Opening Instructions");
    window.setTimeout(function() {
      document.getElementById("close-modal-button").focus();
    }, 1500);
  };

  closeModal = () => {
    this.setState({ modalShow: false });
    this.ariaAnnounce("Closing Instructions");
    window.setTimeout(function() {
      document.getElementById("help-button").focus();
    }, 1500);
  };

  clearSelectedNotes = e => {
    if (e.target.isEqualNode(this.mural.current)) {
      this.props.clearSelectedNotes();
    }
  };

  addNoteToMural = e => {
    this.ariaAnnounce("New note added.");

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
            announce={this.ariaAnnounce} // give every sticky note an ariaAnnounce trigger
          />
        );
      }
    );

    /** role="status" (is implicitly aria-live="polite")
     *  vs. aria-live="assertive"
     *
     * I currently prefer aria-live="assertive" because it
     * has the aria announcement override the meaningless
     * "React mini mural, web content" from focus handoff
     */
    return (
      <div id="Mural" className="Mural" ref={this.mural}>
        <Toolbar
          ariaAnnounce={this.ariaAnnounce}
          addNoteToMural={this.addNoteToMural}
          helpButton={this.showModal}
        />
        <Welcome show={this.state.modalShow} closeButton={this.closeModal} />
        {StickyNotes}
        <span
          ref={this.srContent}
          className="sr-only"
          id="announcements"
          // role="status"
          aria-live="assertive"
          aria-hidden="true"
        />
      </div>
    );
  }
}

export default Mural;
