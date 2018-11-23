import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    files: false,
    images: [],
    desc: []
  };

  componentDidMount() {
    axios.get("/files").then(all =>
      this.setState({
        images: all.data.files,
        desc: all.data.newItem
      })
    );
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1 style={{ textAlign: "center", marginTop: "4px" }}>
            My image upload
          </h1>
          <form action="/upload" method="post" encType="multipart/form-data">
            <div>
              <input
                type="file"
                name="file"
                id="file"
                className="custom-file-input"
              />
              <label for="file" className="custom-file-label">
                Choose file
              </label>
            </div>
            <div>
              <input type="text" name="text" id="text" />
              <label htmlFor="text">Choose text</label>
            </div>
            <input type="submit" value="submit" />
          </form>
          {this.state.images ? (
            <div>
              {this.state.images.map(file => (
                <div>
                  <img
                    src={"image/" + file.filename}
                    alt="test"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <a href={`${file.filename}`}>
                    {" "}
                    <p>{`${file.filename}`}</p>
                  </a>
                  <form
                    action={`/files/${file._id}?_method=DELETE`}
                    method="POST"
                  >
                    <button>Delete</button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p> No files found </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
