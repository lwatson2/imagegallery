import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    files: false,
    images: []
  };

  componentDidMount() {
    axios.get("/files").then(all =>
      this.setState({
        images: all.data
      })
    );
  }
  render() {
    console.log(this.props);
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
            <input type="submit" value="submit" />
          </form>
          {this.state.images.map(image => (
            <img src={image.filename} alt="test" />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
