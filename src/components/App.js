import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import DisplayRepos from "./DisplayRepos";

class App extends React.Component {
  state = { data: [] };
  onReposearch = async keyword => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc&per_page=20`
    );
    let reposdata = response.data.items;
    this.setState({ data: reposdata });
  };
  render() {
    return (
      <div>
        <SearchBar onclick={this.onReposearch} />
        <DisplayRepos />
      </div>
    );
  }
}

export default App;
