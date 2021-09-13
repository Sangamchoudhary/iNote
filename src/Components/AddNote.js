import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (event) => {
    event.preventDefault(); //Add this to not reload the page on click submit button
    addNote(note.title, note.description, note.tag); // sending info what details we want to add
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <strong>Tag</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Title</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            required
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <strong> Description</strong>
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            style={{ height: "90px" }}
            minLength={3}
            value={note.description}
            onChange={onChange}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-outline-danger"
          valu={note.tag}
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
