import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EditNotesFields from "./editNotesFileds";
import axios from "axios";
class EditNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUser: null,
      notesData: [],
      notesName: "",
    };
    this.setNotesName = this.setNotesName.bind(this);
  }

  setNotesName(e) {
    this.setState({
      notesName: e.target.value,
    });
  }

  componentDidMount() {
    let token = localStorage.getItem("token");

    if (!token) {
      this.props.history.push("/login");
    }

    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    axios
      .get(
        "https://gladiator-digital-diary-server.herokuapp.com/api/notes",
        config
      )
      .then((res) => {
        this.setState({
          notesData: res.data.notes,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
        {console.log(this.state.notesData.length != 0)}
        {this.state.notesData.length != 0 ? (
          <EditNotesFields
            id={this.props.location.state.id}
            note={this.state.notesData}
          />
        ) : null}
      </>
    );
  }
}

export default withRouter(EditNotes);
