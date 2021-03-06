import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StickyNote from "./StickyNote";
import {
  setSelectedNote,
  pushSelectedNote,
  clearSelectedNotes
} from "../../actions/mural-actions";
import { deleteNote, updateNote } from "../../actions/notes-actions";

const mapStateToProps = state => {
  return {
    multipleSelection: state.mural.multipleSelection
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedNote,
      pushSelectedNote,
      clearSelectedNotes,
      updateNote,
      deleteNote
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StickyNote);
