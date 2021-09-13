import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <span
          onClick={() => {
            updateNote(note);
          }}
          className="position-absolute top-0 editNote translate-middle badge rounded-pill bg-warning"
        >
          <i className="far fa-edit mx1"></i>
        </span>
        <span
          onClick={() => {
            deleteNote(note._id);
            
            props.showAlert("Note Deleted successfully", "danger");
          }}
          className="position-absolute top-0 deleteNote translate-middle badge rounded-pill bg-danger"
        >
          <i className="fas fa-trash mx-1"></i>
        </span>
        <div className="card-body">
          <h5 className="card-title" style={{ display: "flex" }}>
            {note.title}
            <strong
              className="badge rounded-pill bg-info tagOnNote mx-2"
              style={{ fontSize: "14px" }}
            >
              {note.tag}
            </strong>
          </h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
