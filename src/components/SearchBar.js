import React from "react";

class SearchBar extends React.Component {
  state = { searchkeyword: "" };
  onInputSubmit = event => {
    const value = event.target.value;
    this.props.inputchange(value);
    this.setState({ searchkeyword: value });
  };

  OnFormsubmit = event => {
    event.preventDefault();
    this.props.onclick(this.state.searchkeyword);
  };
  render() {
    return (
      <div className="button_box2">
        <form className="form-wrapper-2 cf" onSubmit={this.OnFormsubmit}>
          <input
            type="text"
            placeholder="Search here"
            onChange={this.onInputSubmit}
          />
          <button disabled={this.props.disable} type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
